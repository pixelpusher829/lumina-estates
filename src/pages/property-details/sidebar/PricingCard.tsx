import React from "react";
import { Property } from "@/shared/types/types";

interface PricingCardProps {
	property: Property;
}

const PricingCard: React.FC<PricingCardProps> = ({ property }) => {
	return (
		<div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/40">
			<div className="mb-6">
				<span className="text-3xl font-bold text-slate-900">
					{property.currency}
					{property.price.toLocaleString()}
				</span>
				<span className="text-slate-500 ml-2">/ total price</span>
			</div>

			<div className="space-y-3">
				<button className="w-full py-3.5 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/20">
					Request a Tour
				</button>
				<button className="w-full py-3.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors">
					Contact Agent
				</button>
			</div>

			<p className="text-xs text-slate-400 text-center mt-4">
				You won't be charged yet.
			</p>
		</div>
	);
};

export default PricingCard;
