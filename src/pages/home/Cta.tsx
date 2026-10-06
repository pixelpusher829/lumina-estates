import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router";
import { AGENTS } from "@/shared/data/agents";

const SELLER_POINTS = [
	"Free, no-obligation valuation",
	"Professional photography included",
	"Average 14 days to sell",
];

const Cta = () => {
	return (
		<section className="py-16 md:py-24 bg-slate-50">
			<div className="container mx-auto px-6">
				<div className="palette-light grid gap-6 lg:grid-cols-5">
					{/* Buyers & renters */}
					<div className="relative lg:col-span-3 min-h-105 rounded-3xl overflow-hidden flex items-end bg-[url(/images/cta/cta-home.webp)] bg-cover bg-position-[50%_70%]">
						{/* Solid tint behind the copy, fading out to reveal the photo on the right. */}
						<div className="absolute inset-0 bg-indigo-950/40" />
						<div className="absolute inset-0 bg-linear-to-r from-indigo-950 via-indigo-950/90 to-indigo-950/30" />
						<div className="relative p-8 md:p-12 max-w-xl">
							<p className="text-sm font-semibold text-emerald-400 mb-3">
								Buying or renting
							</p>
							<h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
								Ready to find your dream home?
							</h2>
							<p className="text-white/85 text-lg leading-relaxed mb-8">
								Join thousands of clients who found their perfect match with
								Lumina Estates.
							</p>
							<Link
								to="/featured"
								className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-900 font-bold rounded-xl hover:bg-primary-50 transition-colors shadow-xl group"
							>
								Start Your Search
								<ArrowRight
									size={18}
									className="transition-transform group-hover:translate-x-1"
								/>
							</Link>
						</div>
					</div>

					{/* Sellers */}
					<div className="lg:col-span-2 rounded-3xl bg-slate-900 p-8 md:p-10 flex flex-col">
						<p className="text-sm font-semibold text-emerald-400 mb-3">
							Thinking of selling?
						</p>
						<h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6">
							Find out what your home is worth.
						</h2>
						<ul className="space-y-3 mb-8">
							{SELLER_POINTS.map((point) => (
								<li
									key={point}
									className="flex items-center gap-3 text-slate-300"
								>
									<span className="w-5 h-5 rounded-full bg-emerald-400/15 text-emerald-400 flex items-center justify-center shrink-0">
										<Check size={13} strokeWidth={3} />
									</span>
									{point}
								</li>
							))}
						</ul>

						<div className="mt-auto pt-6 border-t border-white/10 flex flex-col sm:flex-row lg:flex-col xl:flex-row sm:items-center gap-5 justify-between">
							<div className="flex items-center gap-3">
								<div className="flex -space-x-3">
									{AGENTS.slice(0, 4).map((agent) => (
										<img
											key={agent.slug}
											src={agent.image}
											alt={agent.name}
											loading="lazy"
											className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-900"
										/>
									))}
								</div>
								<p className="text-sm text-slate-400 leading-tight">
									Talk to a<br />
									local expert
								</p>
							</div>
							<Link
								to="/contact"
								className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-400 text-slate-900 font-bold rounded-xl hover:bg-emerald-300 transition-colors"
							>
								Book a valuation
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Cta;
