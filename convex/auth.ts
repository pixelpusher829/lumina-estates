import { Anonymous } from "@convex-dev/auth/providers/Anonymous";
import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";
import { ConvexError } from "convex/values";
import { isAdminEmail } from "./lib/admin";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
	providers: [
		// Site owner. Runs on every flow, so removing an email from ADMIN_EMAILS
		// also blocks existing accounts from signing in.
		Password({
			profile(params) {
				const email = String(params.email ?? "")
					.trim()
					.toLowerCase();
				if (!isAdminEmail(email)) {
					throw new ConvexError(
						"This email is not authorised to access the admin area.",
					);
				}
				return { email };
			},
		}),
		// Portfolio visitors are signed into a sandboxed demo account automatically.
		Anonymous,
	],
});
