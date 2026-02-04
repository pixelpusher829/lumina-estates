import { ArrowRight, TrendingUp } from "lucide-react";
import type React from "react";
import investmentImg from "@/shared/images/services/investment.webp";

const Investment: React.FC = () => {
	return (
		<section className="py-32 relative bg-slate-50/50 z-20">
			<div className="container mx-auto px-6">
				<div className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-24">
					{/* Text Content */}
					<div className="lg:w-1/2 relative z-10">
						<div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-400 mb-6">
							<TrendingUp size={24} />
						</div>
						<h2 className="text-4xl font-bold text-slate-900 mb-6">
							Strategic Investment <br />
							Consulting
						</h2>
						<p className="text-lg text-slate-600 leading-relaxed mb-8">
							Real estate is the cornerstone of wealth. We provide
							institutional-grade analytics to individual investors, identifying
							high-growth corridors and turnkey rental opportunities before they
							hit the mass market.
						</p>
						<button className="text-primary-700 font-bold hover:text-primary-800 inline-flex items-center gap-2 group"
						type="button">
							View Market Reports{" "}
							<ArrowRight
								size={20}
								className="group-hover:translate-x-1 transition-transform"
							/>
						</button>
					</div>

					{/* Asymmetrical Image Cluster */}
					<div className="lg:w-1/2 relative">
						<div className="relative z-10 w-4/5 ml-auto lg:ml-0 lg:mr-auto lg:w-11/12">
							<img
								src={investmentImg}
								alt="Skyscraper"
								className="rounded-[2.5rem] shadow-2xl w-full object-cover aspect-3/4"
							/>
						</div>
						{/* Floating Glass Card */}
						<div className="absolute top-1/2 left-4 right-auto -translate-y-1/2 z-20 bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/50 max-w-xs lg:left-auto lg:-right-8">
							<div className="flex items-center gap-3 mb-2">
								<div className="w-3 h-3 rounded-full bg-emerald-500"></div>
								<span className="text-sm font-semibold text-slate-800">
									ROI Projection
								</span>
							</div>
							<div className="text-3xl font-bold text-slate-900 mb-1">
								+12.4%
							</div>
							<div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
								<div className="bg-emerald-500 w-3/4 h-full rounded-full"></div>
							</div>
						</div>
						{/* Decorative Blob */}
						<div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -z-10"></div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Investment;
