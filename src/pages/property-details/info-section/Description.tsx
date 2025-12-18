import React from "react";
import { Property } from "@/shared/types/types";

interface PropertyDescriptionProps {
	property: Property;
}

const PropertyDescription: React.FC<PropertyDescriptionProps> = ({
	property,
}) => {
	return (
		<div>
			<h3 className="text-xl font-bold text-slate-900 mb-4">About this home</h3>
			<p className="text-slate-600 leading-relaxed text-lg">
				{property.description}
			</p>
		</div>
	);
};

export default PropertyDescription;
