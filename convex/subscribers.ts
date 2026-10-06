import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { canModify, getStaff, requireStaff } from "./lib/admin";
import { EMAIL_PATTERN, LIMITS } from "./shared";

export const subscribe = mutation({
	args: { email: v.string() },
	handler: async (ctx, args) => {
		const email = args.email.trim().toLowerCase();
		if (!EMAIL_PATTERN.test(email) || email.length > LIMITS.email) {
			throw new ConvexError("Please enter a valid email address.");
		}
		const staff = await getStaff(ctx);
		const isDemo = staff?.role === "demo";

		const existing = await ctx.db
			.query("subscribers")
			.withIndex("by_email", (q) => q.eq("email", email))
			.collect();
		// Demo sign-ups are kept separate so they appear in that demo session's list.
		if (existing.some((s) => !!s.isDemo === isDemo)) return;

		await ctx.db.insert("subscribers", {
			email,
			ownerId: isDemo ? staff?.user._id : undefined,
			isDemo: isDemo || undefined,
		});
	},
});

export const list = query({
	args: {},
	handler: async (ctx) => {
		const staff = await requireStaff(ctx);
		if (staff.role === "admin") {
			return ctx.db.query("subscribers").order("desc").collect();
		}
		return ctx.db
			.query("subscribers")
			.withIndex("by_owner", (q) => q.eq("ownerId", staff.user._id))
			.order("desc")
			.collect();
	},
});

export const remove = mutation({
	args: { id: v.id("subscribers") },
	handler: async (ctx, { id }) => {
		const staff = await requireStaff(ctx);
		const subscriber = await ctx.db.get(id);
		if (!subscriber) return;
		if (!canModify(staff, subscriber)) throw new ConvexError("Unauthorized");
		await ctx.db.delete(id);
	},
});
