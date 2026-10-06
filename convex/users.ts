import { query } from "./_generated/server";
import { getStaff } from "./lib/admin";

/** The signed-in staff member (if any) and their role. */
export const viewer = query({
	args: {},
	handler: async (ctx) => {
		const staff = await getStaff(ctx);
		if (!staff) return null;
		return { email: staff.user.email ?? null, role: staff.role };
	},
});
