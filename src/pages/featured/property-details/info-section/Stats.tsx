import { Bath, Bed, Home, Move } from "lucide-react";
import type { Listing } from "@/shared/types/types";
import { formatNumber } from "@/shared/utils/format";

interface PropertyStatsProps {
	property: Listing;
}

const PropertyStats = ({ property }: PropertyStatsProps) => {
	const stats = [
		{ icon: Bed, value: property.beds, label: "Bedrooms" },
		{ icon: Bath, value: property.baths, label: "Bathrooms" },
		{ icon: Move, value: formatNumber(property.sqft), label: "Square ft" },
		{ icon: Home, value: property.type, label: "Property type" },
	];

	return (
		<dl className="grid grid-cols-2 sm:grid-cols-4 gap-4">
			{stats.map(({ icon: Icon, value, label }) => (
				<div key={label} className="flex flex-col-reverse gap-1">
					<dt className="text-xs text-slate-500 uppercase tracking-wide">
						{label}
					</dt>
					<dd className="flex items-center gap-2 text-slate-900 font-bold text-xl">
						<Icon size={20} className="text-slate-400" /> {value}
					</dd>
				</div>
			))}
		</dl>
	);
};

export default PropertyStats;
