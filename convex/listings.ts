import { getAuthUserId } from "@convex-dev/auth/server";
import { ConvexError, type Infer, v } from "convex/values";
import type { Doc, Id } from "./_generated/dataModel";
import { mutation, type QueryCtx, query } from "./_generated/server";
import {
	canModify,
	DEMO_LIMITS,
	getStaff,
	requireStaff,
	type Staff,
} from "./lib/admin";
import { AGENTS, LIMITS, PUBLISHED_STATUSES } from "./shared";
import { listingFields, type listingImage, listingStatus } from "./validators";

type ListingImage = Infer<typeof listingImage>;
type ListingInput = Omit<
	Doc<"listings">,
	"_id" | "_creationTime" | "slug" | "updatedAt" | "ownerId" | "isDemo"
>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function fail(message: string): never {
	throw new ConvexError(message);
}

/** Attaches resolved photo URLs, preserving order and skipping missing files. */
async function withPhotos(ctx: QueryCtx, listing: Doc<"listings">) {
	const photos = await Promise.all(
		listing.images.map(async (ref) => ({
			ref,
			url:
				ref.kind === "url" ? ref.url : await ctx.storage.getUrl(ref.storageId),
		})),
	);
	return {
		...listing,
		photos: photos.filter(
			(p): p is { ref: ListingImage; url: string } => !!p.url,
		),
	};
}

/**
 * Demo listings are only visible to the demo session that created them, so
 * visitors can see their test listing on the public site without anyone else
 * seeing it.
 */
function isVisibleTo(listing: Doc<"listings">, viewerId: Id<"users"> | null) {
	return !listing.isDemo || listing.ownerId === viewerId;
}

async function publishedListings(ctx: QueryCtx) {
	const viewerId = await getAuthUserId(ctx);
	const groups = await Promise.all(
		PUBLISHED_STATUSES.map((status) =>
			ctx.db
				.query("listings")
				.withIndex("by_status", (q) => q.eq("status", status))
				.collect(),
		),
	);
	return groups
		.flat()
		.filter((l) => isVisibleTo(l, viewerId))
		.sort((a, b) => b._creationTime - a._creationTime);
}

function slugify(text: string) {
	return (
		text
			.toLowerCase()
			.normalize("NFKD")
			.replace(/[̀-ͯ]/g, "")
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/^-+|-+$/g, "")
			.slice(0, 80) || "listing"
	);
}

async function uniqueSlug(ctx: QueryCtx, title: string) {
	const base = slugify(title);
	let slug = base;
	for (let n = 2; ; n++) {
		const existing = await ctx.db
			.query("listings")
			.withIndex("by_slug", (q) => q.eq("slug", slug))
			.unique();
		if (!existing) return slug;
		slug = `${base}-${n}`;
	}
}

function cleanList(
	values: string[],
	maxItems: number,
	maxLength: number,
	label: string,
) {
	const cleaned = [...new Set(values.map((v) => v.trim()).filter(Boolean))];
	if (cleaned.length > maxItems) fail(`At most ${maxItems} ${label} allowed.`);
	if (cleaned.some((v) => v.length > maxLength)) {
		fail(
			`Each ${label.replace(/s$/, "")} must be ${maxLength} characters or fewer.`,
		);
	}
	return cleaned;
}

/** Validates and normalises listing input. Throws a ConvexError on bad data. */
async function validateListing(
	ctx: QueryCtx,
	staff: Staff,
	input: ListingInput,
): Promise<ListingInput> {
	const title = input.title.trim();
	const description = input.description.trim();
	const address = input.address.trim();
	const city = input.city.trim();

	if (!title) fail("Title is required.");
	if (title.length > LIMITS.title) {
		fail(`Title must be ${LIMITS.title} characters or fewer.`);
	}
	if (!description) fail("Description is required.");
	if (description.length > LIMITS.description) fail("Description is too long.");
	if (!address || address.length > LIMITS.address) {
		fail("A valid address is required.");
	}
	if (!city || city.length > LIMITS.city) fail("A valid city is required.");

	if (
		!Number.isFinite(input.price) ||
		input.price <= 0 ||
		input.price > LIMITS.maxPrice
	) {
		fail("Price must be a positive number.");
	}
	for (const [label, value] of [
		["Bedrooms", input.beds],
		["Bathrooms", input.baths],
		["Square footage", input.sqft],
	] as const) {
		if (!Number.isFinite(value) || value < 0 || value > 100_000) {
			fail(`${label} must be zero or more.`);
		}
	}
	if (!Number.isInteger(input.beds)) fail("Bedrooms must be a whole number.");
	if ((input.baths * 2) % 1 !== 0) fail("Bathrooms must be in steps of 0.5.");

	if (!AGENTS.some((a) => a.slug === input.agent)) {
		fail("Please choose a valid agent.");
	}

	const maxImages =
		staff.role === "demo" ? DEMO_LIMITS.imagesPerListing : LIMITS.images;
	if (input.images.length === 0 && input.status !== "draft") {
		fail("Add at least one photo before publishing.");
	}
	if (input.images.length > maxImages) {
		fail(`At most ${maxImages} photos allowed.`);
	}
	for (const image of input.images) {
		if (image.kind === "url") {
			// Demo users can only reuse the bundled sample images, not hotlink.
			const allowed =
				staff.role === "demo"
					? image.url.startsWith("/images/")
					: /^(https?:\/\/|\/)/.test(image.url);
			if (!allowed) fail("Invalid image URL.");
			continue;
		}
		const file = await ctx.db.system.get(image.storageId);
		if (!file) {
			fail(
				"One of the uploaded photos could not be found. Please re-upload it.",
			);
		}
		if (file.size > LIMITS.imageBytes) fail("Photos must be 5MB or smaller.");
		if (file.contentType && !file.contentType.startsWith("image/")) {
			fail("Only image files can be uploaded.");
		}
	}

	return {
		...input,
		title,
		description,
		address,
		city,
		price: Math.round(input.price),
		sqft: Math.round(input.sqft),
		tags: cleanList(input.tags, LIMITS.tags, LIMITS.tag, "amenities"),
		highlights: cleanList(
			input.highlights,
			LIMITS.highlights,
			LIMITS.highlight,
			"highlights",
		),
	};
}

function storageIds(images: ListingImage[]) {
	return images.flatMap((img) =>
		img.kind === "storage" ? [img.storageId] : [],
	);
}

/** Loads a listing the caller is allowed to modify, or throws. */
async function getEditable(ctx: QueryCtx, staff: Staff, id: Id<"listings">) {
	const listing = await ctx.db.get(id);
	if (!listing) fail("Listing not found.");
	if (!canModify(staff, listing)) {
		fail(
			"Sample listings are read-only in the demo. Create your own listing to try editing.",
		);
	}
	return listing;
}

// ---------------------------------------------------------------------------
// Public queries
// ---------------------------------------------------------------------------

export const list = query({
	args: {},
	handler: async (ctx) => {
		const listings = await publishedListings(ctx);
		return Promise.all(listings.map((l) => withPhotos(ctx, l)));
	},
});

export const featured = query({
	args: {},
	handler: async (ctx) => {
		const viewerId = await getAuthUserId(ctx);
		const featured = (
			await ctx.db
				.query("listings")
				.withIndex("by_featured", (q) => q.eq("featured", true))
				.order("desc")
				.collect()
		).filter((l) => l.status !== "draft" && isVisibleTo(l, viewerId));

		const picks =
			featured.length > 0
				? featured.slice(0, 6)
				: (await publishedListings(ctx)).slice(0, 3);
		return Promise.all(picks.map((l) => withPhotos(ctx, l)));
	},
});

export const getBySlug = query({
	args: { slug: v.string() },
	handler: async (ctx, { slug }) => {
		const listing = await ctx.db
			.query("listings")
			.withIndex("by_slug", (q) => q.eq("slug", slug))
			.unique();
		if (!listing) return null;
		const viewerId = await getAuthUserId(ctx);
		if (!isVisibleTo(listing, viewerId)) return null;
		// Drafts are only visible to staff (for previewing).
		if (listing.status === "draft" && !(await getStaff(ctx))) return null;
		return withPhotos(ctx, listing);
	},
});

export const getManyByIds = query({
	args: { ids: v.array(v.string()) },
	handler: async (ctx, { ids }) => {
		const viewerId = await getAuthUserId(ctx);
		const results = await Promise.all(
			ids.slice(0, 100).map(async (raw) => {
				const id = ctx.db.normalizeId("listings", raw);
				const listing = id ? await ctx.db.get(id) : null;
				return listing &&
					listing.status !== "draft" &&
					isVisibleTo(listing, viewerId)
					? withPhotos(ctx, listing)
					: null;
			}),
		);
		return results.filter((l) => l !== null);
	},
});

export const similar = query({
	args: { id: v.id("listings") },
	handler: async (ctx, { id }) => {
		const listing = await ctx.db.get(id);
		if (!listing) return [];
		const candidates = (await publishedListings(ctx)).filter(
			(l) => l._id !== id && l.status !== "sold",
		);
		const score = (l: Doc<"listings">) =>
			(l.city === listing.city ? 2 : 0) + (l.type === listing.type ? 1 : 0);
		const picks = candidates
			.filter((l) => score(l) > 0)
			.sort((a, b) => score(b) - score(a))
			.slice(0, 3);
		return Promise.all(picks.map((l) => withPhotos(ctx, l)));
	},
});

// ---------------------------------------------------------------------------
// Admin / demo dashboard
// ---------------------------------------------------------------------------

export const adminList = query({
	args: {},
	handler: async (ctx) => {
		const staff = await requireStaff(ctx);
		const listings = (await ctx.db.query("listings").order("desc").collect())
			// Demo users never see other demo users' listings.
			.filter((l) => staff.role === "admin" || isVisibleTo(l, staff.user._id));
		return Promise.all(
			listings.map(async (l) => {
				const cover = l.images[0];
				const coverUrl = !cover
					? null
					: cover.kind === "url"
						? cover.url
						: await ctx.storage.getUrl(cover.storageId);
				return { ...l, coverUrl, canEdit: canModify(staff, l) };
			}),
		);
	},
});

export const adminGet = query({
	args: { id: v.string() },
	handler: async (ctx, { id }) => {
		const staff = await requireStaff(ctx);
		const listingId = ctx.db.normalizeId("listings", id);
		const listing = listingId ? await ctx.db.get(listingId) : null;
		if (!listing) return null;
		if (staff.role !== "admin" && !isVisibleTo(listing, staff.user._id)) {
			return null;
		}
		return {
			...(await withPhotos(ctx, listing)),
			canEdit: canModify(staff, listing),
		};
	},
});

export const generateUploadUrl = mutation({
	args: {},
	handler: async (ctx) => {
		await requireStaff(ctx);
		return ctx.storage.generateUploadUrl();
	},
});

/** Deletes uploads that were never attached to a listing (e.g. form cancelled). */
export const discardUploads = mutation({
	args: { storageIds: v.array(v.id("_storage")) },
	handler: async (ctx, { storageIds: ids }) => {
		await requireStaff(ctx);
		const listings = await ctx.db.query("listings").collect();
		const inUse = new Set(listings.flatMap((l) => storageIds(l.images)));
		for (const id of ids.slice(0, 50)) {
			if (!inUse.has(id) && (await ctx.db.system.get(id))) {
				await ctx.storage.delete(id);
			}
		}
	},
});

export const create = mutation({
	args: listingFields,
	handler: async (ctx, args) => {
		const staff = await requireStaff(ctx);
		const isDemo = staff.role === "demo";

		if (isDemo) {
			const mine = await ctx.db
				.query("listings")
				.withIndex("by_owner", (q) => q.eq("ownerId", staff.user._id))
				.collect();
			if (mine.length >= DEMO_LIMITS.listings) {
				fail(
					`Demo accounts can create up to ${DEMO_LIMITS.listings} listings. Delete one to add another.`,
				);
			}
		}

		const data = await validateListing(ctx, staff, args);
		const slug = await uniqueSlug(ctx, data.title);
		const id = await ctx.db.insert("listings", {
			...data,
			slug,
			ownerId: staff.user._id,
			isDemo: isDemo || undefined,
			updatedAt: Date.now(),
		});
		return { id, slug };
	},
});

export const update = mutation({
	args: { id: v.id("listings"), ...listingFields },
	handler: async (ctx, { id, ...args }) => {
		const staff = await requireStaff(ctx);
		const existing = await getEditable(ctx, staff, id);
		const data = await validateListing(ctx, staff, args);

		// Remove photos that were taken off the listing.
		const kept = new Set(storageIds(data.images));
		for (const storageId of storageIds(existing.images)) {
			if (!kept.has(storageId)) await ctx.storage.delete(storageId);
		}

		await ctx.db.patch(id, { ...data, updatedAt: Date.now() });
		return { id, slug: existing.slug };
	},
});

export const setStatus = mutation({
	args: { id: v.id("listings"), status: listingStatus },
	handler: async (ctx, { id, status }) => {
		const staff = await requireStaff(ctx);
		const listing = await getEditable(ctx, staff, id);
		if (status !== "draft" && listing.images.length === 0) {
			fail("Add at least one photo before publishing.");
		}
		await ctx.db.patch(id, { status, updatedAt: Date.now() });
	},
});

export const toggleFeatured = mutation({
	args: { id: v.id("listings") },
	handler: async (ctx, { id }) => {
		const staff = await requireStaff(ctx);
		const listing = await getEditable(ctx, staff, id);
		await ctx.db.patch(id, {
			featured: !listing.featured,
			updatedAt: Date.now(),
		});
	},
});

export const remove = mutation({
	args: { id: v.id("listings") },
	handler: async (ctx, { id }) => {
		const staff = await requireStaff(ctx);
		const listing = await getEditable(ctx, staff, id);
		for (const storageId of storageIds(listing.images)) {
			await ctx.storage.delete(storageId);
		}
		await ctx.db.delete(id);
	},
});
