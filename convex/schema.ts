import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { enquiryKind, enquiryStatus, listingFields } from "./validators";

// `isDemo` records were created by a sandboxed demo session. They're only
// visible to the session that created them (and the site owner), and are
// deleted automatically by the cleanup cron.
const demoFields = {
	ownerId: v.optional(v.id("users")),
	isDemo: v.optional(v.boolean()),
};

export default defineSchema({
	...authTables,

	listings: defineTable({
		...listingFields,
		...demoFields,
		slug: v.string(),
		updatedAt: v.number(),
	})
		.index("by_slug", ["slug"])
		.index("by_status", ["status"])
		.index("by_featured", ["featured"])
		.index("by_demo", ["isDemo"])
		.index("by_owner", ["ownerId"]),

	enquiries: defineTable({
		...demoFields,
		kind: enquiryKind,
		name: v.string(),
		email: v.string(),
		phone: v.optional(v.string()),
		topic: v.optional(v.string()),
		message: v.string(),
		listingId: v.optional(v.id("listings")),
		// Denormalised so the enquiry still makes sense if the listing is deleted.
		listingTitle: v.optional(v.string()),
		listingSlug: v.optional(v.string()),
		agent: v.optional(v.string()),
		status: enquiryStatus,
	})
		.index("by_status", ["status"])
		.index("by_email", ["email"])
		.index("by_demo", ["isDemo"])
		.index("by_owner", ["ownerId"]),

	subscribers: defineTable({
		...demoFields,
		email: v.string(),
	})
		.index("by_email", ["email"])
		.index("by_demo", ["isDemo"])
		.index("by_owner", ["ownerId"]),
});
