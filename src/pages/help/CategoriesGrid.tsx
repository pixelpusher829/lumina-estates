import React from "react";
import {
	Home,
	FileText,
	UserCheck,
	ShieldQuestion,
	ArrowRight,
} from "lucide-react";
import { Link } from "react-router";

const CategoriesGrid: React.FC = () => {
	const categories = [
		{
			icon: Home,
			title: "Buying a Home",
			desc: "Guides for first-time buyers, financing, and closing.",
			link: "#",
		},
		{
			icon: FileText,
			title: "Selling Your Property",
			desc: "Tips on valuation, staging, and listing your home.",
			link: "#",
		},
		{
			icon: UserCheck,
			title: "Renting",
			desc: "Tenant screening, lease agreements, and deposits.",
			link: "#",
		},
		{
			icon: ShieldQuestion,
			title: "Account & Security",
			desc: "Managing your profile, privacy settings, and data.",
			link: "#",
		},
	];

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-20 mb-16 relative z-10">
			{categories.map((cat, idx) => (
				<div
					key={idx}
					className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:-translate-y-1 transition-transform duration-300">
					<div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 mb-6">
						<cat.icon size={24} />
					</div>
					<h3 className="text-xl font-bold text-slate-900 mb-2">{cat.title}</h3>
					<p className="text-slate-500 text-sm mb-6 leading-relaxed">
						{cat.desc}
					</p>
					<Link
						to="/faq"
						className="text-primary-600 font-bold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
						Read Articles <ArrowRight size={16} />
					</Link>
				</div>
			))}
		</div>
	);
};

export default CategoriesGrid;
