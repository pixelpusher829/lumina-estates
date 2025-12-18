import React from "react";
import { Property } from "@/shared/types/types";

interface PropertyHighlightsProps {
	property: Property;
}

const PropertyHighlights: React.FC<PropertyHighlightsProps> = ({
	property,
}) => {
	return (
		<div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
			<h4 className="font-bold text-slate-900 mb-2">Property Highlights</h4>
			<ul className="list-disc list-inside text-slate-600 space-y-1">
				<li>Premium location in {property.city}</li>
				<li>Recently inspected and verified</li>
				<li>High-speed internet ready</li>
				<li>Flexible lease terms available</li>
			</ul>
		</div>
	);
};

export default PropertyHighlights;
