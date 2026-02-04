import { Award, Target, TrendingUp, Users } from "lucide-react";
import type React from "react";

const Mission: React.FC = () => {
	return (
		<div className="bg-slate-50 py-24 mb-24">
			<div className="container mx-auto px-6">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
					<div>
						<h2 className="text-3xl font-bold text-slate-900 mb-6">
							Our Mission
						</h2>
						<p className="text-slate-600 leading-relaxed mb-6">
							We strive to empower our clients with data-driven insights and
							curated opportunities. Whether you are buying your first apartment
							or investing in a commercial portfolio, our goal is to maximize
							your value and peace of mind.
						</p>
						<p className="text-slate-600 leading-relaxed">
							Integrity, transparency, and innovation are at the core of
							everything we do. We believe in building long-term relationships
							that extend far beyond the closing table.
						</p>
					</div>
					<div className="grid grid-cols-2 gap-6">
						<div className="bg-white p-6 rounded-2xl shadow-sm">
							<Target className="text-emerald-400 mb-4" size={32} />
							<h3 className="font-bold text-slate-900 mb-2">Precision</h3>
							<p className="text-sm text-slate-500">
								Targeted search and marketing strategies.
							</p>
						</div>
						<div className="bg-white p-6 rounded-2xl shadow-sm">
							<Users className="text-emerald-400 mb-4" size={32} />
							<h3 className="font-bold text-slate-900 mb-2">Community</h3>
							<p className="text-sm text-slate-500">
								Building strong local networks.
							</p>
						</div>
						<div className="bg-white p-6 rounded-2xl shadow-sm">
							<Award className="text-emerald-400 mb-4" size={32} />
							<h3 className="font-bold text-slate-900 mb-2">Excellence</h3>
							<p className="text-sm text-slate-500">
								Award-winning service standards.
							</p>
						</div>
						<div className="bg-white p-6 rounded-2xl shadow-sm">
							<TrendingUp className="text-emerald-400 mb-4" size={32} />
							<h3 className="font-bold text-slate-900 mb-2">Growth</h3>
							<p className="text-sm text-slate-500">
								Focus on long-term asset value.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Mission;
