import React from "react";
import { Link } from "react-router";
import { Quote } from "lucide-react";
import { TESTIMONIALS } from "@/shared/data/constants"; // Adjusted path

const Testimonials: React.FC = () => {
	return (
		<section className="py-24 bg-slate-50">
			<div className="container mx-auto px-6">
				<div className="flex flex-col md:flex-row items-center justify-between gap-12">
					<div className="md:w-1/3">
						<h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
							Loved by people <br /> just like you.
						</h2>
						<p className="text-slate-500 mb-8 leading-relaxed">
							We pride ourselves on providing an exceptional level of service.
							Don't just take our word for it—hear what our satisfied clients
							have to say about their journey with Lumina.
						</p>
						<Link
							to="/featured"
							className="text-primary-600 font-bold hover:text-primary-700 inline-flex items-center gap-2 group">
							Start your story{" "}
							<span className="group-hover:translate-x-1 transition-transform">
								&rarr;
							</span>
						</Link>
					</div>

					<div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{TESTIMONIALS.map((t, idx) => (
							<div
								key={idx}
								className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
								<div className="text-primary-300 mb-4">
									<Quote size={24} fill="currentColor" />
								</div>
								<p className="text-slate-600 text-sm mb-6 leading-relaxed">
									"{t.quote}"
								</p>
								<div className="flex items-center gap-3">
									<img
										src={t.image}
										alt={t.name}
										className="w-10 h-10 rounded-full object-cover"
									/>
									<div>
										<h4 className="text-sm font-bold text-slate-900">
											{t.name}
										</h4>
										<p className="text-xs text-slate-400">{t.role}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Testimonials;
