import { getAuthUserId } from "@convex-dev/auth/server";
import { ConvexError } from "convex/values";
import type { Doc } from "../_generated/dataModel";
import type { QueryCtx } from "../_generated/server";

export { DEMO_LIMITS } from "../shared";

/**
 * Roles:
 * - "admin": the site owner(s), signed in with an email on ADMIN_EMAILS.
 *   Full access to everything.
 * - "demo": an anonymous visitor exploring the admin dashboard (this is a
 *   portfolio project). Sandboxed: sample data is read-only, anything they
 *   create is private to them, and it is wiped automatically.
 */
export type Role = "admin" | "demo";

export interface Staff {
	user: Doc<"users">;
	role: Role;
}

/** Comma-separated list of emails allowed full admin access. */
export function adminEmails(): string[] {
	return (process.env.ADMIN_EMAILS ?? "")
		.split(",")
		.map((email) => email.trim().toLowerCase())
		.filter(Boolean);
}

export function isAdminEmail(email: string | undefined): boolean {
	return !!email && adminEmails().includes(email.trim().toLowerCase());
}

export function roleOf(user: Doc<"users">): Role | null {
	if (isAdminEmail(user.email)) return "admin";
	if (user.isAnonymous) return "demo";
	return null;
}

type AuthCtx = Pick<QueryCtx, "auth" | "db">;

/** The signed-in staff member (admin or demo user), or null. */
export async function getStaff(ctx: AuthCtx): Promise<Staff | null> {
	const userId = await getAuthUserId(ctx);
	if (!userId) return null;
	const user = await ctx.db.get(userId);
	if (!user) return null;
	const role = roleOf(user);
	return role ? { user, role } : null;
}

/** Requires an admin or demo session. */
export async function requireStaff(ctx: AuthCtx): Promise<Staff> {
	const staff = await getStaff(ctx);
	if (!staff) throw new ConvexError("Unauthorized");
	return staff;
}

/** Requires the real site owner (not a demo session). */
export async function requireAdmin(ctx: AuthCtx): Promise<Staff> {
	const staff = await requireStaff(ctx);
	if (staff.role !== "admin") {
		throw new ConvexError("This action isn't available in the demo.");
	}
	return staff;
}

/** Whether `staff` may modify a record created by `ownerId`. */
export function canModify(
	staff: Staff,
	record: { ownerId?: Doc<"users">["_id"]; isDemo?: boolean },
) {
	return (
		staff.role === "admin" ||
		(!!record.isDemo && record.ownerId === staff.user._id)
	);
}
