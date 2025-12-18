import React from "react";
import { Property } from "@/shared/types/types";
import { CheckCircle2 } from "lucide-react";

interface PropertyAmenitiesProps {
	property: Property;
}

const PropertyAmenities: React.FC<PropertyAmenitiesProps> = ({ property }) => {
	return (
		<div>
			<h3 className="text-xl font-bold text-slate-900 mb-6">Key Amenities</h3>
			<div className="grid grid-cols-2 gap-y-4 gap-x-8">
				{property.tags.map((tag) => (
					<div key={tag} className="flex items-center gap-3">
						<CheckCircle2
							size={20}
							className="text-emerald-500 flex-shrink-0"
						/>
						<span className="text-slate-700 font-medium">{tag}</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default PropertyAmenities;
