import { CheckCircle2 } from "lucide-react";
import type { Listing } from "@/shared/types/types";

interface PropertyAmenitiesProps {
	property: Listing;
}

const PropertyAmenities = ({ property }: PropertyAmenitiesProps) => {
	if (property.tags.length === 0) return null;
	return (
		<div>
			<h2 className="text-xl font-bold text-slate-900 mb-6">Key Amenities</h2>
			<ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
				{property.tags.map((tag) => (
					<li key={tag} className="flex items-center gap-3">
						<CheckCircle2 size={20} className="text-emerald-500 shrink-0" />
						<span className="text-slate-700 font-medium">{tag}</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default PropertyAmenities;
