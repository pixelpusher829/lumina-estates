import { internal } from "./_generated/api";
import { internalMutation } from "./_generated/server";
import { DEMO_LIMITS } from "./lib/admin";

const BATCH = 200;
const ORPHAN_GRACE_MS = 60 * 60 * 1000;

/** Deletes uploaded files older than an hour that aren't used by any listing. */
export const orphanFiles = internalMutation({
	args: {},
	handler: async (ctx) => {
		const cutoff = Date.now() - ORPHAN_GRACE_MS;
		const files = await ctx.db.system
			.query("_storage")
			.withIndex("by_creation_time", (q) => q.lt("_creationTime", cutoff))
			.take(1000);
		if (files.length === 0) return 0;

		const listings = await ctx.db.query("listings").collect();
		const inUse = new Set(
			listings.flatMap((l) =>
				l.images.flatMap((img) =>
					img.kind === "storage" ? [img.storageId] : [],
				),
			),
		);

		let deleted = 0;
		for (const file of files) {
			if (!inUse.has(file._id)) {
				await ctx.storage.delete(file._id);
				deleted++;
			}
		}
		return deleted;
	},
});

/** Removes demo listings, enquiries and subscribers older than the demo TTL. */
export const demoData = internalMutation({
	args: {},
	handler: async (ctx) => {
		const cutoff = Date.now() - DEMO_LIMITS.ttlMs;
		let removed = 0;

		const listings = await ctx.db
			.query("listings")
			.withIndex("by_demo", (q) =>
				q.eq("isDemo", true).lt("_creationTime", cutoff),
			)
			.take(BATCH);
		for (const listing of listings) {
			for (const img of listing.images) {
				if (img.kind === "storage") await ctx.storage.delete(img.storageId);
			}
			await ctx.db.delete(listing._id);
			removed++;
		}

		for (const table of ["enquiries", "subscribers"] as const) {
			const rows = await ctx.db
				.query(table)
				.withIndex("by_demo", (q) =>
					q.eq("isDemo", true).lt("_creationTime", cutoff),
				)
				.take(BATCH);
			for (const row of rows) {
				await ctx.db.delete(row._id);
				removed++;
			}
		}

		// Keep going in follow-up runs if there was more than one batch.
		if (removed >= BATCH) {
			await ctx.scheduler.runAfter(0, internal.cleanup.demoData, {});
		}
		return removed;
	},
});

/** Deletes expired anonymous demo accounts and their auth records. */
export const demoAccounts = internalMutation({
	args: {},
	handler: async (ctx) => {
		const cutoff = Date.now() - DEMO_LIMITS.accountTtlMs;
		const users = await ctx.db
			.query("users")
			.withIndex("by_creation_time", (q) => q.lt("_creationTime", cutoff))
			.take(BATCH);

		let removed = 0;
		for (const user of users) {
			if (!user.isAnonymous) continue;

			const sessions = await ctx.db
				.query("authSessions")
				.withIndex("userId", (q) => q.eq("userId", user._id))
				.collect();
			for (const session of sessions) {
				const tokens = await ctx.db
					.query("authRefreshTokens")
					.withIndex("sessionId", (q) => q.eq("sessionId", session._id))
					.collect();
				for (const token of tokens) await ctx.db.delete(token._id);
				await ctx.db.delete(session._id);
			}

			const accounts = await ctx.db
				.query("authAccounts")
				.withIndex("userIdAndProvider", (q) => q.eq("userId", user._id))
				.collect();
			for (const account of accounts) await ctx.db.delete(account._id);

			await ctx.db.delete(user._id);
			removed++;
		}

		if (users.length >= BATCH) {
			await ctx.scheduler.runAfter(0, internal.cleanup.demoAccounts, {});
		}
		return removed;
	},
});
