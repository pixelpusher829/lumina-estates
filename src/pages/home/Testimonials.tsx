import { Quote, Star } from "lucide-react";
import { Link } from "react-router";
import SectionHeader from "@/shared/components/SectionHeader";
import { TESTIMONIALS } from "@/shared/data/testimonials";

const Stars = ({ size = 16 }: { size?: number }) => (
	<div
		className="flex gap-0.5 text-amber-400"
		role="img"
		aria-label="5 out of 5 stars"
	>
		{[1, 2, 3, 4, 5].map((n) => (
			<Star key={n} size={size} fill="currentColor" strokeWidth={0} />
		))}
	</div>
);

const Testimonials = () => {
	const [featured, ...rest] = TESTIMONIALS;

	return (
		<section className="py-16 md:py-24 bg-white">
			<div className="container mx-auto px-6">
				<div className="grid gap-12 lg:grid-cols-12 items-start">
					{/* Summary */}
					<div className="lg:col-span-4">
						<SectionHeader
							title="Loved by people just like you"
							description="We pride ourselves on an exceptional level of service. Don't just take our word for it."
							layout="stacked"
							className="mb-8"
						/>
						<div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 max-w-sm">
							<span className="text-4xl font-bold text-slate-900">4.9</span>
							<div>
								<Stars />
								<p className="text-sm text-slate-500 mt-1">
									from 500+ verified reviews
								</p>
							</div>
						</div>
						<Link
							to="/featured"
							className="mt-8 text-primary-600 font-bold hover:text-primary-700 inline-flex items-center gap-2 group"
						>
							Start your story
							<span className="group-hover:translate-x-1 transition-transform">
								&rarr;
							</span>
						</Link>
					</div>

					{/* Quotes */}
					<div className="lg:col-span-8 grid gap-6 md:grid-cols-2">
						{featured && (
							<figure className="md:col-span-2 bg-slate-50 p-8 md:p-10 rounded-3xl border border-slate-100">
								<Quote
									size={32}
									className="text-slate-200 mb-6"
									fill="currentColor"
								/>
								<blockquote className="text-xl md:text-2xl font-medium text-slate-800 leading-snug">
									“{featured.quote}”
								</blockquote>
								<figcaption className="mt-8 flex items-center justify-between gap-4 flex-wrap">
									<div className="flex items-center gap-3">
										<img
											src={featured.image}
											alt=""
											className="w-12 h-12 rounded-full object-cover"
										/>
										<div>
											<p className="font-bold text-slate-900">
												{featured.name}
											</p>
											<p className="text-sm text-slate-500">{featured.role}</p>
										</div>
									</div>
									<Stars />
								</figcaption>
							</figure>
						)}

						{rest.map((t) => (
							<figure
								key={t.name}
								className="bg-slate-50 p-6 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-md transition-shadow flex flex-col"
							>
								<Stars size={14} />
								<blockquote className="text-slate-600 text-sm mt-4 mb-6 leading-relaxed grow">
									“{t.quote}”
								</blockquote>
								<figcaption className="flex items-center gap-3">
									<img
										src={t.image}
										alt=""
										className="w-10 h-10 rounded-full object-cover"
									/>
									<div>
										<p className="text-sm font-bold text-slate-900">{t.name}</p>
										<p className="text-xs text-slate-500">{t.role}</p>
									</div>
								</figcaption>
							</figure>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Testimonials;
