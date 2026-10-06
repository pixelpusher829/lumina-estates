import { MapPin } from "lucide-react";
import StatusBadge from "@/shared/components/StatusBadge";
import type { Listing } from "@/shared/types/types";
import { isNewListing } from "@/shared/utils/format";

interface PropertyHeaderProps {
	property: Listing;
}

const PropertyHeader = ({ property }: PropertyHeaderProps) => {
	return (
		<div>
			<div className="flex flex-wrap items-center gap-3 mb-4">
				<StatusBadge status={property.status} />
				<span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider rounded-md">
					{property.type}
				</span>
				{property.status !== "sold" && isNewListing(property._creationTime) && (
					<span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider rounded-md">
						New Listing
					</span>
				)}
			</div>
			<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
				{property.title}
			</h1>
			<div className="flex items-center text-slate-500 font-medium">
				<MapPin size={18} className="mr-2 text-slate-400 shrink-0" />
				{property.address}, {property.city}
			</div>
		</div>
	);
};

export default PropertyHeader;
