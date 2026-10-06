import { api } from "@convex/_generated/api";
import { useMutation } from "convex/react";
import { ArrowRight, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { type FormEvent, useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import { APP_NAME, CONTACT } from "@/shared/data/constants";
import { errorMessage } from "@/shared/utils/format";
import Logo from "./Logo";

const LINK_GROUPS = [
	{
		title: "Quick Links",
		links: [
			{ name: "Properties", to: "/featured" },
			{ name: "About Us", to: "/about" },
			{ name: "Our Agents", to: "/agents" },
			{ name: "Services", to: "/services" },
		],
	},
	{
		title: "Support",
		links: [
			{ name: "Help Center", to: "/help" },
			{ name: "FAQ", to: "/faq" },
			{ name: "Contact Us", to: "/contact" },
			{ name: "Terms & Legal", to: "/legal" },
		],
	},
];

const NewsletterForm = () => {
	const subscribe = useMutation(api.subscribers.subscribe);
	const [email, setEmail] = useState("");
	const [submitting, setSubmitting] = useState(false);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setSubmitting(true);
		try {
			await subscribe({ email });
			setEmail("");
			toast.success("You're subscribed! Watch your inbox for new listings.");
		} catch (error) {
			toast.error(errorMessage(error));
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<form className="relative" onSubmit={handleSubmit}>
			<label htmlFor="newsletter-email" className="sr-only">
				Email address
			</label>
			<input
				id="newsletter-email"
				type="email"
				required
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder="Email address"
				autoComplete="email"
				className="w-full bg-slate-800/50 border border-slate-700 rounded-xl pl-4 pr-14 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
			/>
			<button
				className="absolute right-1.5 top-1.5 bottom-1.5 bg-primary-600 hover:bg-primary-500 disabled:opacity-60 text-white px-3 rounded-lg transition-colors flex items-center justify-center"
				type="submit"
				disabled={submitting}
				aria-label="Subscribe"
			>
				{submitting ? (
					<Loader2 size={18} className="animate-spin" />
				) : (
					<ArrowRight size={18} />
				)}
			</button>
		</form>
	);
};

const Footer = () => {
	return (
		<footer className="bg-slate-900 text-slate-300 pt-16 pb-10">
			<div className="container mx-auto px-6">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-14">
					{/* Brand Column */}
					<div className="space-y-6">
						<Link to="/" className="flex items-center gap-3 text-white">
							<Logo />
							<span className="text-2xl font-bold tracking-tight">
								{APP_NAME}
							</span>
						</Link>
						<p className="text-slate-400 leading-relaxed text-sm">
							Redefining luxury real estate. We curate exclusive properties that
							match your lifestyle, making the search for your dream home
							effortless.
						</p>
						<ul className="space-y-2 text-sm">
							<li>
								<a
									href={CONTACT.phoneHref}
									className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
								>
									<Phone size={14} /> {CONTACT.phone}
								</a>
							</li>
							<li>
								<a
									href={`mailto:${CONTACT.email}`}
									className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
								>
									<Mail size={14} /> {CONTACT.email}
								</a>
							</li>
							<li className="flex items-center gap-2 text-slate-400">
								<MapPin size={14} /> {CONTACT.addressLine1},{" "}
								{CONTACT.addressLine2}
							</li>
						</ul>
					</div>

					{LINK_GROUPS.map((group) => (
						<div key={group.title}>
							<h4 className="text-white font-bold text-lg mb-6">
								{group.title}
							</h4>
							<ul className="space-y-4">
								{group.links.map((link) => (
									<li key={link.to}>
										<Link
											to={link.to}
											className="text-slate-400 hover:text-white hover:translate-x-1 transition-all inline-block"
										>
											{link.name}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}

					{/* Newsletter */}
					<div>
						<h4 className="text-white font-bold text-lg mb-6">Newsletter</h4>
						<p className="text-slate-400 text-sm mb-4">
							Get new listings and market updates in your inbox.
						</p>
						<NewsletterForm />
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
					<p>
						&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
					</p>
					<div className="flex gap-6">
						<Link to="/legal" className="hover:text-white transition-colors">
							Privacy
						</Link>
						<Link to="/legal" className="hover:text-white transition-colors">
							Terms
						</Link>
						<Link to="/admin" className="hover:text-white transition-colors">
							Admin
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
