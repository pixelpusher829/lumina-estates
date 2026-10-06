import { Heart, LayoutDashboard, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import ThemeToggle from "@/shared/components/ThemeToggle";
import { APP_NAME, CONTACT } from "@/shared/data/constants";
import { useFavorites } from "@/shared/hooks/useFavorites";
import Logo from "./Logo";

const NAV_LINKS = [
	{ name: "Home", path: "/" },
	{ name: "Properties", path: "/featured" },
	{ name: "Services", path: "/services" },
	{ name: "About", path: "/about" },
	{ name: "Contact", path: "/contact" },
];

const Navbar = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const { pathname } = useLocation();
	const { favorites } = useFavorites();

	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 20);
		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Close the mobile menu whenever the route changes.
	// biome-ignore lint/correctness/useExhaustiveDependencies: run on route change
	useEffect(() => {
		setMobileMenuOpen(false);
	}, [pathname]);

	// Only the home page has a hero image behind the navbar.
	const transparent = pathname === "/" && !isScrolled && !mobileMenuOpen;

	// Shared style for the round icon buttons on the right (matches ThemeToggle).
	const iconButton = `w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
		transparent
			? "text-white/80 hover:text-white hover:bg-white/10"
			: "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
	}`;

	const linkClass = ({ isActive }: { isActive: boolean }) =>
		`inline-block py-1 text-sm font-medium transition-colors ${
			transparent
				? isActive
					? "text-white"
					: "text-slate-200 hover:text-white"
				: isActive
					? "text-primary-700"
					: "text-slate-600 hover:text-primary-700"
		}`;

	return (
		<nav
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				transparent
					? "palette-light bg-transparent py-6"
					: "bg-white/90 backdrop-blur-md shadow-sm py-4"
			}`}
		>
			<div className="container mx-auto px-6 flex items-center justify-between">
				<Link to="/" className="flex items-center gap-2 group">
					<Logo />
					<span
						className={`text-xl font-bold tracking-tight ${transparent ? "text-white" : "text-slate-900"}`}
					>
						{APP_NAME}
					</span>
				</Link>

				{/* Desktop Nav */}
				<div className="hidden lg:flex items-center gap-8">
					{NAV_LINKS.map((link) => (
						<NavLink
							key={link.path}
							to={link.path}
							end={link.path === "/"}
							className={linkClass}
						>
							{link.name}
						</NavLink>
					))}
				</div>

				{/* Actions */}
				<div className="flex items-center gap-1">
					<a
						href={CONTACT.phoneHref}
						className="hidden xl:flex items-center gap-2 mr-2 text-primary-700 font-semibold px-4 py-2 bg-primary-50 rounded-full text-sm hover:bg-primary-100 transition-colors"
					>
						<Phone size={16} />
						<span>{CONTACT.phone}</span>
					</a>
					<ThemeToggle onImage={transparent} />
					<Link
						to="/admin"
						title="Admin dashboard"
						aria-label="Admin dashboard"
						className={`${iconButton} hidden sm:flex`}
					>
						<LayoutDashboard size={20} />
					</Link>
					<Link
						to="/favorites"
						title="Saved properties"
						aria-label={`Saved properties (${favorites.length})`}
						className={`${iconButton} relative`}
					>
						<Heart size={20} />
						{favorites.length > 0 && (
							<span className="absolute top-0.5 right-0.5 min-w-4 h-4 px-1 bg-rose-500 text-snow text-[10px] font-bold flex items-center justify-center rounded-full">
								{favorites.length}
							</span>
						)}
					</Link>

					<button
						className={`${iconButton} lg:hidden`}
						onClick={() => setMobileMenuOpen((open) => !open)}
						type="button"
						aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
						aria-expanded={mobileMenuOpen}
					>
						{mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
					</button>
				</div>
			</div>

			{/* Mobile Menu */}
			{mobileMenuOpen && (
				<div className="absolute top-full left-0 right-0 bg-white border-t border-slate-100 p-6 shadow-xl flex flex-col gap-1 lg:hidden animate-fade-in">
					{NAV_LINKS.map((link) => (
						<NavLink
							key={link.path}
							to={link.path}
							end={link.path === "/"}
							className={({ isActive }) =>
								`text-lg font-medium py-2 ${isActive ? "text-primary-700" : "text-slate-800"}`
							}
						>
							{link.name}
						</NavLink>
					))}
					<Link
						to="/admin"
						className="mt-2 flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 text-white font-semibold"
					>
						<LayoutDashboard size={18} />
						Admin
					</Link>
					<div className="flex items-center justify-between pt-4 mt-2 border-t border-slate-100">
						<Link
							to="/favorites"
							className="text-sm text-slate-600 font-medium"
						>
							Saved properties ({favorites.length})
						</Link>
						<a
							href={CONTACT.phoneHref}
							className="text-primary-700 font-bold text-sm"
						>
							{CONTACT.phone}
						</a>
					</div>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
