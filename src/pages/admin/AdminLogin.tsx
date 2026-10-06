import { api } from "@convex/_generated/api";
import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth, useQuery } from "convex/react";
import { ArrowLeft, Loader2, Lock } from "lucide-react";
import { type FormEvent, useState } from "react";
import { Link, Navigate, useLocation } from "react-router";
import Seo from "@/shared/components/Seo";
import { APP_NAME } from "@/shared/data/constants";
import Logo from "@/shared/layout/Logo";
import { errorMessage } from "@/shared/utils/format";

type Flow = "signIn" | "signUp";

const AdminLogin = () => {
	const { signIn } = useAuthActions();
	const { isAuthenticated } = useConvexAuth();
	const viewer = useQuery(api.users.viewer);
	const location = useLocation();
	const [flow, setFlow] = useState<Flow>("signIn");
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const redirectTo =
		(location.state as { from?: string } | null)?.from ?? "/admin";

	if (isAuthenticated && viewer?.role === "admin") {
		return <Navigate to={redirectTo} replace />;
	}

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		setSubmitting(true);
		setError(null);
		try {
			await signIn("password", {
				email: String(data.get("email")).trim().toLowerCase(),
				password: String(data.get("password")),
				flow,
			});
		} catch (err) {
			setError(
				errorMessage(
					err,
					flow === "signIn"
						? "Incorrect email or password."
						: "Could not create the account. It may already exist, or the password is too short (min 8 characters).",
				),
			);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<main className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
			<Seo title="Admin sign in" />
			<div className="w-full max-w-md">
				<Link
					to="/"
					className="inline-flex items-center gap-2 py-1 text-sm text-slate-500 hover:text-slate-900 mb-5"
				>
					<ArrowLeft size={16} /> Back to site
				</Link>
				<div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8">
					<div className="flex items-center gap-3 mb-8">
						<Logo />
						<span className="text-xl font-bold tracking-tight">{APP_NAME}</span>
					</div>
					<h1 className="text-2xl font-bold text-slate-900 mb-1">
						{flow === "signIn" ? "Owner sign in" : "Create owner account"}
					</h1>
					<p className="text-sm text-slate-500 mb-8">
						{flow === "signIn"
							? "For the site owner. Just looking around? "
							: "Only emails on the admin allowlist can create an account. "}
						<Link
							to="/admin"
							className="font-semibold text-primary-600 hover:underline"
						>
							Explore the demo instead
						</Link>
					</p>

					<form className="space-y-5" onSubmit={handleSubmit}>
						<div>
							<label className="label" htmlFor="admin-email">
								Email
							</label>
							<input
								id="admin-email"
								name="email"
								type="email"
								className="input"
								autoComplete="email"
								required
							/>
						</div>
						<div>
							<label className="label" htmlFor="admin-password">
								Password
							</label>
							<input
								id="admin-password"
								name="password"
								type="password"
								className="input"
								autoComplete={
									flow === "signIn" ? "current-password" : "new-password"
								}
								minLength={8}
								required
							/>
						</div>

						{error && (
							<p
								className="text-sm text-rose-600 bg-rose-50 rounded-xl px-4 py-3"
								role="alert"
							>
								{error}
							</p>
						)}

						<button
							type="submit"
							className="btn-primary w-full"
							disabled={submitting}
						>
							{submitting ? (
								<Loader2 size={18} className="animate-spin" />
							) : (
								<Lock size={18} />
							)}
							{flow === "signIn" ? "Sign in" : "Create account"}
						</button>
					</form>

					<p className="text-sm text-slate-500 text-center mt-6">
						{flow === "signIn"
							? "First time here? "
							: "Already have an account? "}
						<button
							type="button"
							className="inline-block py-1 font-semibold text-primary-600 hover:underline"
							onClick={() => {
								setFlow(flow === "signIn" ? "signUp" : "signIn");
								setError(null);
							}}
						>
							{flow === "signIn" ? "Create an account" : "Sign in"}
						</button>
					</p>
				</div>
			</div>
		</main>
	);
};

export default AdminLogin;
