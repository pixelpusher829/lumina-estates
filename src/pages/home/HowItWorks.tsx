import { CalendarCheck, KeyRound, Search } from "lucide-react";
import SectionHeader from "@/shared/components/SectionHeader";

const STEPS = [
	{
		icon: Search,
		title: "Search & shortlist",
		desc: "Filter by location, budget and style, then save the homes you love to compare later.",
	},
	{
		icon: CalendarCheck,
		title: "Book a tour",
		desc: "Request a viewing from any listing. A local agent confirms a time that suits you, usually within a day.",
	},
	{
		icon: KeyRound,
		title: "Move in",
		desc: "We negotiate, coordinate inspections and paperwork, and hand you the keys. No surprises.",
	},
];

const HowItWorks = () => {
	return (
		<section className="py-16 md:py-24 bg-white">
			<div className="container mx-auto px-6">
				<SectionHeader
					title="From first search to front door"
					description="A clear, guided process with an expert agent beside you at every step, whether you are buying or renting."
				/>

				<ol className="grid gap-6 md:grid-cols-3">
					{STEPS.map((step, i) => (
						<li
							key={step.title}
							className="relative p-8 rounded-3xl border border-slate-100 bg-slate-50/60"
						>
							<div className="flex items-center justify-between mb-8">
								<div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-emerald-400">
									<step.icon size={24} />
								</div>
								{/* Decorative (WCAG 1.4.3 exempt): the <ol> already conveys step order. */}
								<span
									aria-hidden="true"
									className="text-5xl font-bold text-slate-200 tabular-nums"
								>
									0{i + 1}
								</span>
							</div>
							<h3 className="text-lg font-bold text-slate-900 mb-2">
								{step.title}
							</h3>
							<p className="text-slate-500 text-sm leading-relaxed">
								{step.desc}
							</p>
						</li>
					))}
				</ol>
			</div>
		</section>
	);
};

export default HowItWorks;
