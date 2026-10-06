import SectionHeader from "@/shared/components/SectionHeader";

const MILESTONES = [
	{
		year: "2010",
		title: "Founded in Metropolis",
		desc: "Two agents, one small office and a belief that buying a home should feel exciting.",
	},
	{
		year: "2015",
		title: "Expanded to the coast",
		desc: "Opened our Lakeside and Santa Monica teams to serve waterfront buyers.",
	},
	{
		year: "2020",
		title: "Went digital-first",
		desc: "Launched virtual tours and online offers, cutting time to close in half.",
	},
	{
		year: "Today",
		title: "1,200+ homes later",
		desc: "Still independent, still local, and still answering our own phones.",
	},
];

const Story = () => {
	return (
		<section className="py-16 md:py-24">
			<div className="container mx-auto px-6">
				<SectionHeader
					title="Our story"
					description="From a two-person office to one of the region's most trusted agencies."
				/>

				<ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
					{MILESTONES.map((milestone) => (
						<li
							key={milestone.year}
							className="relative pt-8 border-t border-slate-200"
						>
							<span className="absolute -top-1.5 left-0 w-3 h-3 rounded-full bg-emerald-400 ring-4 ring-white" />
							<p className="text-sm font-semibold text-slate-500 mb-2">
								{milestone.year}
							</p>
							<h3 className="text-lg font-bold text-slate-900 mb-2">
								{milestone.title}
							</h3>
							<p className="text-sm text-slate-500 leading-relaxed">
								{milestone.desc}
							</p>
						</li>
					))}
				</ol>
			</div>
		</section>
	);
};

export default Story;
