import { CalendarCheck, MessageSquare } from "lucide-react";
import type { Listing } from "@/shared/types/types";
import { formatPrice } from "@/shared/utils/format";

interface PricingCardProps {
	property: Listing;
	onRequestTour: () => void;
	onContactAgent: () => void;
}

const PricingCard = ({
	property,
	onRequestTour,
	onContactAgent,
}: PricingCardProps) => {
	const sold = property.status === "sold";
	const rent = property.status === "for_rent";
	const pricePerSqft =
		!rent && property.sqft > 0
			? Math.round(property.price / property.sqft)
			: null;

	return (
		<div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/40">
			<div className="mb-6">
				<p className="text-sm text-slate-500 mb-1">
					{sold ? "Sold for" : rent ? "Monthly rent" : "Asking price"}
				</p>
				<span className="text-3xl font-bold text-slate-900">
					{formatPrice(property.price, property.status)}
				</span>
				{pricePerSqft && (
					<p className="text-sm text-slate-500 mt-1">
						{formatPrice(pricePerSqft)} / sqft
					</p>
				)}
			</div>

			{sold ? (
				<div className="space-y-3">
					<p className="text-sm text-slate-600 bg-slate-50 rounded-xl p-4">
						This property has been sold. Interested in something similar? Our
						agents can help.
					</p>
					<button
						className="btn-secondary w-full"
						type="button"
						onClick={onContactAgent}
					>
						<MessageSquare size={18} /> Contact Agent
					</button>
				</div>
			) : (
				<div className="space-y-3">
					<button
						className="btn-primary w-full py-3.5"
						type="button"
						onClick={onRequestTour}
					>
						<CalendarCheck size={18} /> Request a Tour
					</button>
					<button
						className="btn-secondary w-full py-3.5"
						type="button"
						onClick={onContactAgent}
					>
						<MessageSquare size={18} /> Contact Agent
					</button>
				</div>
			)}

			<p className="text-xs text-slate-500 text-center mt-4">
				Free, no-obligation enquiry. We usually reply within a day.
			</p>
		</div>
	);
};

export default PricingCard;
