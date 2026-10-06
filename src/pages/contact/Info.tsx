import { Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import { Link } from "react-router";
import { CONTACT } from "@/shared/data/constants";

const ContactInfo = () => {
	const items = [
		{
			icon: Phone,
			title: CONTACT.phone,
			subtitle: CONTACT.hours,
			href: CONTACT.phoneHref,
		},
		{
			icon: Mail,
			title: CONTACT.email,
			subtitle: "We reply within one business day",
			href: `mailto:${CONTACT.email}`,
		},
		{
			icon: MapPin,
			title: CONTACT.addressLine1,
			subtitle: CONTACT.addressLine2,
			href: `https://maps.google.com/?q=${encodeURIComponent(`${CONTACT.addressLine1}, ${CONTACT.addressLine2}`)}`,
		},
	];

	return (
		<div className="space-y-8">
			<div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
				<h2 className="text-xl font-bold text-slate-900 mb-6">
					Contact Information
				</h2>

				<ul className="space-y-6">
					{items.map(({ icon: Icon, title, subtitle, href }) => (
						<li key={title}>
							<a
								href={href}
								target={href.startsWith("http") ? "_blank" : undefined}
								rel={href.startsWith("http") ? "noreferrer" : undefined}
								className="flex items-start gap-4 group"
							>
								<div className="p-4 bg-emerald-50 text-emerald-500 rounded-xl group-hover:bg-emerald-100 transition-colors">
									<Icon size={20} />
								</div>
								<div className="min-w-0">
									<p className="text-slate-700 font-semibold text-lg wrap-break-word group-hover:text-primary-700 transition-colors">
										{title}
									</p>
									<p className="text-slate-500 text-sm">{subtitle}</p>
								</div>
							</a>
						</li>
					))}
				</ul>
			</div>

			<div className="palette-light bg-emerald-400 dark:bg-emerald-950 dark:border dark:border-emerald-900 p-8 rounded-3xl shadow-lg dark:shadow-none text-slate-900 dark:text-snow relative overflow-hidden">
				<div className="absolute top-0 right-0 w-32 h-32 bg-emerald-300 dark:bg-emerald-700 dark:opacity-30 rounded-full blur-2xl -mr-10 -mt-10" />
				<div className="relative z-10">
					<h2 className="text-xl font-bold mb-3 flex items-center gap-2">
						<MessageSquare size={20} />
						Have a quick question?
					</h2>
					<p className="text-emerald-950 dark:text-emerald-200 mb-6 text-sm">
						Many common questions about buying, renting and selling are answered
						in our FAQ.
					</p>
					<Link
						to="/faq"
						className="block text-center w-full py-3 bg-white text-emerald-900 dark:bg-emerald-500 dark:text-emerald-950 font-bold rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-400 transition-colors"
					>
						Read the FAQ
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ContactInfo;
