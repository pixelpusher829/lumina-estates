import { v } from "convex/values";

export const listingType = v.union(
	v.literal("Apartment"),
	v.literal("House"),
	v.literal("Villa"),
	v.literal("Penthouse"),
	v.literal("Studio"),
);

export const listingStatus = v.union(
	v.literal("draft"),
	v.literal("for_sale"),
	v.literal("for_rent"),
	v.literal("sold"),
);

export const listingImage = v.union(
	v.object({ kind: v.literal("url"), url: v.string() }),
	v.object({ kind: v.literal("storage"), storageId: v.id("_storage") }),
);

export const enquiryKind = v.union(
	v.literal("contact"),
	v.literal("tour"),
	v.literal("agent"),
);

export const enquiryStatus = v.union(
	v.literal("new"),
	v.literal("read"),
	v.literal("archived"),
);

// Fields an admin can edit on a listing.
export const listingFields = {
	title: v.string(),
	description: v.string(),
	price: v.number(),
	address: v.string(),
	city: v.string(),
	type: listingType,
	status: listingStatus,
	featured: v.boolean(),
	beds: v.number(),
	baths: v.number(),
	sqft: v.number(),
	tags: v.array(v.string()),
	highlights: v.array(v.string()),
	agent: v.string(),
	images: v.array(listingImage),
};
