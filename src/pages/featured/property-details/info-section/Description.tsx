import type { Listing } from "@/shared/types/types";

interface PropertyDescriptionProps {
	property: Listing;
}

const PropertyDescription = ({ property }: PropertyDescriptionProps) => {
	return (
		<div>
			<h3 className="text-xl font-bold text-slate-900 mb-4">About this home</h3>
			<p className="text-slate-600 leading-relaxed text-lg whitespace-pre-line">
				{property.description}
			</p>
		</div>
	);
};

export default PropertyDescription;
