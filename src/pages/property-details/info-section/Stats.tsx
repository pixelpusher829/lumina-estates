import React from "react";
import { Property } from "@/shared/types/types";
import { Bed, Bath, Move } from "lucide-react";

interface PropertyStatsProps {
	property: Property;
}

const PropertyStats: React.FC<PropertyStatsProps> = ({ property }) => {
	return (
		<div className="grid grid-cols-3 gap-4">
			<div className="flex flex-col gap-1">
				<span className="flex items-center gap-2 text-slate-900 font-bold text-xl">
					<Bed size={20} className="text-slate-400" /> {property.specs.beds}
				</span>
				<span className="text-xs text-slate-500 uppercase tracking-wide">
					Bedrooms
				</span>
			</div>
			<div className="flex flex-col gap-1">
				<span className="flex items-center gap-2 text-slate-900 font-bold text-xl">
					<Bath size={20} className="text-slate-400" /> {property.specs.baths}
				</span>
				<span className="text-xs text-slate-500 uppercase tracking-wide">
					Bathrooms
				</span>
			</div>
			<div className="flex flex-col gap-1">
				<span className="flex items-center gap-2 text-slate-900 font-bold text-xl">
					<Move size={20} className="text-slate-400" /> {property.specs.sqft}
				</span>
				<span className="text-xs text-slate-500 uppercase tracking-wide">
					Square Ft
				</span>
			</div>
		</div>
	);
};

export default PropertyStats;
