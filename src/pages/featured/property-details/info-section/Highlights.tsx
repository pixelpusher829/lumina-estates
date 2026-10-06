import type { Listing } from "@/shared/types/types";

interface PropertyHighlightsProps {
	property: Listing;
}

const PropertyHighlights = ({ property }: PropertyHighlightsProps) => {
	if (property.highlights.length === 0) return null;
	return (
		<div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
			<h2 className="font-bold text-slate-900 mb-3">Property Highlights</h2>
			<ul className="list-disc list-inside text-slate-600 space-y-1.5">
				{property.highlights.map((highlight) => (
					<li key={highlight}>{highlight}</li>
				))}
			</ul>
		</div>
	);
};

export default PropertyHighlights;
