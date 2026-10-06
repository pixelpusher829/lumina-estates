import { ConvexError, v } from "convex/values";
import type { Id } from "./_generated/dataModel";
import { mutation, type QueryCtx, query } from "./_generated/server";
import { canModify, getStaff, requireStaff, type Staff } from "./lib/admin";
import { EMAIL_PATTERN, LIMITS } from "./shared";
import { enquiryKind, enquiryStatus } from "./validators";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

export const submit = mutation({
	args: {
		kind: enquiryKind,
		name: v.string(),
		email: v.string(),
		phone: v.optional(v.string()),
		topic: v.optional(v.string()),
		message: v.string(),
		listingId: v.optional(v.id("listings")),
		// Honeypot: hidden from humans, bots tend to fill it in.
		website: v.optional(v.string()),
	},
	handler: async (ctx, { website, ...args }) => {
		if (website) return; // Silently drop spam.

		const name = args.name.trim();
		const email = args.email.trim().toLowerCase();
		const phone = args.phone?.trim() || undefined;
		const topic = args.topic?.trim() || undefined;
		const message = args.message.trim();

		if (!name || name.length > LIMITS.name) {
			throw new ConvexError("Please enter your name.");
		}
		if (!EMAIL_PATTERN.test(email) || email.length > LIMITS.email) {
			throw new ConvexError("Please enter a valid email address.");
		}
		if (phone && phone.length > LIMITS.phone) {
			throw new ConvexError("Phone number is too long.");
		}
		if (topic && topic.length > LIMITS.topic) {
			throw new ConvexError("Topic is too long.");
		}
		if (!message) throw new ConvexError("Please enter a message.");
		if (message.length > LIMITS.message) {
			throw new ConvexError("Message is too long.");
		}

		const recent = await ctx.db
			.query("enquiries")
			.withIndex("by_email", (q) => q.eq("email", email))
			.order("desc")
			.take(RATE_LIMIT_MAX);
		if (
			recent.length >= RATE_LIMIT_MAX &&
			recent.every((e) => e._creationTime > Date.now() - RATE_LIMIT_WINDOW_MS)
		) {
			throw new ConvexError(
				"Too many messages. Please try again in a few minutes.",
			);
		}

		const listing = args.listingId ? await ctx.db.get(args.listingId) : null;
		// Messages sent while in a demo session show up in that demo inbox.
		const staff = await getStaff(ctx);
		const isDemo = staff?.role === "demo";

		await ctx.db.insert("enquiries", {
			kind: args.kind,
			name,
			email,
			phone,
			topic,
			message,
			listingId: listing?._id,
			listingTitle: listing?.title,
			listingSlug: listing?.slug,
			agent: listing?.agent,
			status: "new",
			ownerId: staff?.user._id,
			isDemo: isDemo || undefined,
		});
	},
});

/** Enquiries visible to the caller: all for the owner, own-only for demo users. */
async function visibleEnquiries(ctx: QueryCtx, staff: Staff, limit: number) {
	if (staff.role === "admin") {
		return ctx.db.query("enquiries").order("desc").take(limit);
	}
	return ctx.db
		.query("enquiries")
		.withIndex("by_owner", (q) => q.eq("ownerId", staff.user._id))
		.order("desc")
		.take(limit);
}

export const list = query({
	args: {},
	handler: async (ctx) => {
		const staff = await requireStaff(ctx);
		return visibleEnquiries(ctx, staff, 500);
	},
});

export const unreadCount = query({
	args: {},
	handler: async (ctx) => {
		const staff = await requireStaff(ctx);
		if (staff.role === "admin") {
			const unread = await ctx.db
				.query("enquiries")
				.withIndex("by_status", (q) => q.eq("status", "new"))
				.take(100);
			return unread.length;
		}
		const mine = await visibleEnquiries(ctx, staff, 100);
		return mine.filter((e) => e.status === "new").length;
	},
});

async function getEditable(ctx: QueryCtx, staff: Staff, id: Id<"enquiries">) {
	const enquiry = await ctx.db.get(id);
	if (!enquiry) throw new ConvexError("Enquiry not found.");
	if (!canModify(staff, enquiry)) throw new ConvexError("Unauthorized");
	return enquiry;
}

export const setStatus = mutation({
	args: { id: v.id("enquiries"), status: enquiryStatus },
	handler: async (ctx, { id, status }) => {
		const staff = await requireStaff(ctx);
		await getEditable(ctx, staff, id);
		await ctx.db.patch(id, { status });
	},
});

export const remove = mutation({
	args: { id: v.id("enquiries") },
	handler: async (ctx, { id }) => {
		const staff = await requireStaff(ctx);
		await getEditable(ctx, staff, id);
		await ctx.db.delete(id);
	},
});
