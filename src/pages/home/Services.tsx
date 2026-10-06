import {
	ArrowRight,
	HeartHandshake,
	Home as HomeIcon,
	ShieldCheck,
	Zap,
} from "lucide-react";
import { Link } from "react-router";
import SectionHeader from "@/shared/components/SectionHeader";

const SERVICES = [
	{
		icon: ShieldCheck,
		title: "Property Insurance",
		desc: "We ensure your asset is protected with top-tier coverage options.",
	},
	{
		icon: Zap,
		title: "Fast Processing",
		desc: "Digital-first workflows mean you get keys in hand faster than ever.",
	},
	{
		icon: HeartHandshake,
		title: "Trusted Advisors",
		desc: "Our agents are top-rated professionals dedicated to your success.",
	},
	{
		icon: HomeIcon,
		title: "Quality Homes",
		desc: "Every listing is verified for quality and accuracy.",
	},
];

const Services = () => {
	return (
		<section className="py-16 md:py-24 bg-white">
			<div className="container mx-auto px-6">
				<SectionHeader
					title="Real estate, made refreshingly simple"
					description="Premium tools and expert guidance from the first viewing to the final signature. We handle the details so you don't have to."
					action={
						<Link
							to="/services"
							className="inline-flex items-center gap-2 font-semibold text-primary-600 hover:text-primary-700 group"
						>
							Explore our services
							<ArrowRight
								size={18}
								className="transition-transform group-hover:translate-x-1"
							/>
						</Link>
					}
				/>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{SERVICES.map((service) => (
						<div
							key={service.title}
							className="flex gap-5 sm:block p-6 sm:p-8 rounded-3xl bg-slate-50 hover:bg-white border border-slate-100 hover:shadow-xl transition-all duration-300 group"
						>
							<div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 bg-white rounded-2xl flex items-center justify-center text-emerald-400 sm:mb-6 shadow-sm group-hover:bg-emerald-400 group-hover:text-snow transition-colors">
								<service.icon size={28} />
							</div>
							<div>
								<h3 className="text-lg font-bold text-slate-900 mb-1.5 sm:mb-3">
									{service.title}
								</h3>
								<p className="text-slate-500 text-sm leading-relaxed">
									{service.desc}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Services;
