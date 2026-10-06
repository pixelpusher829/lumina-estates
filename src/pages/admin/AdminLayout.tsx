import { api } from "@convex/_generated/api";
import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth, useQuery } from "convex/react";
import {
	Building2,
	ExternalLink,
	FlaskConical,
	Inbox,
	LogOut,
	Mail,
	Plus,
	ShieldAlert,
	X,
} from "lucide-react";
import { Suspense, useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import { toast } from "sonner";
import PageLoader from "@/shared/components/PageLoader";
import ThemeToggle from "@/shared/components/ThemeToggle";
import { APP_NAME } from "@/shared/data/constants";
import Logo from "@/shared/layout/Logo";

const DEMO_BANNER_KEY = "lumina_demo_banner_dismissed";

const NavBadge = () => {
	const unread = useQuery(api.enquiries.unreadCount);
	if (!unread) return null;
	return (
		<span className="ml-auto min-w-5 h-5 px-1.5 rounded-full bg-rose-500 text-snow text-xs font-bold flex items-center justify-center">
			{unread >= 100 ? "99+" : unread}
		</span>
	);
};

const DemoBanner = () => {
	const [dismissed, setDismissed] = useState(() => {
		try {
			return sessionStorage.getItem(DEMO_BANNER_KEY) === "1";
		} catch {
			return false;
		}
	});
	if (dismissed) return null;

	const dismiss = () => {
		setDismissed(true);
		try {
			sessionStorage.setItem(DEMO_BANNER_KEY, "1");
		} catch {
			// Not critical.
		}
	};

	return (
		<div className="mb-6 flex items-start gap-3 rounded-2xl border border-primary-200 bg-primary-50 px-4 py-3 text-sm text-primary-900">
			<FlaskConical size={18} className="shrink-0 mt-0.5 text-primary-600" />
			<p className="flex-1">
				<strong>You're exploring the admin demo.</strong> Sample listings are
				read-only. Listings, enquiries and sign-ups you create are only visible
				to you (including on the public site) and are cleared after 24 hours.
				Try creating a listing, then send yourself an enquiry from its page.
			</p>
			<button
				type="button"
				onClick={dismiss}
				aria-label="Dismiss"
				className="p-1 -m-1 rounded text-primary-600 hover:bg-primary-100"
			>
				<X size={16} />
			</button>
		</div>
	);
};

const NAV = [
	{ to: "/admin", label: "Listings", icon: Building2, end: true },
	{ to: "/admin/enquiries", label: "Enquiries", icon: Inbox, badge: true },
	{ to: "/admin/subscribers", label: "Subscribers", icon: Mail },
];

const AdminLayout = () => {
	const { isLoading, isAuthenticated } = useConvexAuth();
	const viewer = useQuery(api.users.viewer, isAuthenticated ? {} : "skip");
	const { signIn, signOut } = useAuthActions();
	const navigate = useNavigate();
	const [demoError, setDemoError] = useState(false);
	const startedDemo = useRef(false);

	// This is a portfolio project: visitors are signed into a sandboxed demo
	// account automatically so they can try the dashboard without credentials.
	useEffect(() => {
		if (isLoading || isAuthenticated || startedDemo.current) return;
		startedDemo.current = true;
		signIn("anonymous").catch((error) => {
			console.error("Failed to start demo session", error);
			setDemoError(true);
		});
	}, [isLoading, isAuthenticated, signIn]);

	const handleSignOut = async () => {
		await signOut();
		toast.success(
			viewer?.role === "demo" ? "Demo session ended" : "Signed out",
		);
		navigate("/");
	};

	if (demoError) {
		return (
			<div className="min-h-screen flex items-center justify-center p-6 text-center">
				<div>
					<p className="text-slate-600 mb-6">
						We couldn't start a demo session. Please try again.
					</p>
					<button
						type="button"
						className="btn-primary"
						onClick={() => window.location.reload()}
					>
						Retry
					</button>
				</div>
			</div>
		);
	}

	if (isLoading || !isAuthenticated || viewer === undefined) {
		return <PageLoader label="Starting your demo session…" />;
	}

	if (viewer === null) {
		return (
			<div className="min-h-screen flex items-center justify-center p-6">
				<div className="text-center max-w-md">
					<div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center">
						<ShieldAlert size={28} />
					</div>
					<h1 className="text-2xl font-bold text-slate-900 mb-2">
						No admin access
					</h1>
					<p className="text-slate-500 mb-8">
						This account isn't allowed to use the dashboard.
					</p>
					<button
						type="button"
						className="btn-secondary"
						onClick={handleSignOut}
					>
						Sign out
					</button>
				</div>
			</div>
		);
	}

	const isDemo = viewer.role === "demo";

	const navLinkClass = ({ isActive }: { isActive: boolean }) =>
		`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap ${
			isActive
				? "bg-primary-50 text-primary-700"
				: "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
		}`;

	return (
		<div className="min-h-screen bg-slate-50 lg:flex">
			{/* Sidebar (desktop) / top bar (mobile) */}
			<aside
				aria-label="Admin navigation"
				className="lg:w-64 lg:shrink-0 lg:h-screen lg:sticky lg:top-0 bg-white border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col"
			>
				<div className="flex items-center justify-between gap-3 px-4 lg:px-6 py-4 lg:py-6">
					<Link to="/admin" className="flex items-center gap-2">
						<Logo />
						<span className="font-bold tracking-tight">{APP_NAME}</span>
						<span className="text-[10px] font-bold uppercase tracking-wider text-primary-700 bg-primary-50 px-1.5 py-0.5 rounded">
							{isDemo ? "Demo" : "Admin"}
						</span>
					</Link>
					<div className="flex items-center lg:hidden">
						<ThemeToggle />
						<Link
							to="/"
							className="p-2 text-slate-500 hover:text-slate-900"
							aria-label="View site"
						>
							<ExternalLink size={20} />
						</Link>
						<button
							type="button"
							onClick={handleSignOut}
							className="p-2 text-slate-500 hover:text-slate-900"
							aria-label={isDemo ? "End demo" : "Sign out"}
						>
							<LogOut size={20} />
						</button>
					</div>
				</div>

				<nav className="flex lg:flex-col gap-1 px-3 pb-3 lg:pb-0 overflow-x-auto no-scrollbar">
					{NAV.map(({ to, label, icon: Icon, end, badge }) => (
						<NavLink key={to} to={to} end={end} className={navLinkClass}>
							<Icon size={18} />
							{label}
							{badge && <NavBadge />}
						</NavLink>
					))}
					<Link
						to="/admin/listings/new"
						className="lg:mt-4 flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold bg-primary-600 text-snow hover:bg-primary-700 transition-colors whitespace-nowrap"
					>
						<Plus size={18} /> New listing
					</Link>
				</nav>

				<div className="hidden lg:block mt-auto p-3 border-t border-slate-100 space-y-1">
					<div className="flex items-center justify-between px-3 text-sm font-semibold text-slate-600">
						Appearance
						<ThemeToggle />
					</div>
					<Link to="/" className={navLinkClass({ isActive: false })}>
						<ExternalLink size={18} /> View site
					</Link>
					<button
						type="button"
						onClick={handleSignOut}
						className={`${navLinkClass({ isActive: false })} w-full`}
					>
						<LogOut size={18} /> {isDemo ? "End demo session" : "Sign out"}
					</button>
					<p className="px-3 pt-2 text-xs text-slate-500 truncate">
						{isDemo ? (
							<>
								Demo account ·{" "}
								<Link
									to="/admin/login"
									className="underline hover:text-slate-700"
								>
									Owner sign in
								</Link>
							</>
						) : (
							viewer.email
						)}
					</p>
				</div>
			</aside>

			<main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-10">
				{isDemo && <DemoBanner />}
				<Suspense fallback={<PageLoader />}>
					<Outlet />
				</Suspense>
			</main>
		</div>
	);
};

export default AdminLayout;
