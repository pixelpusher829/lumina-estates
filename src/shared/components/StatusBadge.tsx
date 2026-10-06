import { type ListingStatus, STATUS_LABELS } from "@convex/shared";

const STYLES: Record<ListingStatus, string> = {
	draft: "bg-slate-100 text-slate-600",
	for_sale: "bg-primary-50 text-primary-700",
	for_rent: "bg-amber-50 text-amber-700",
	sold: "bg-rose-50 text-rose-700",
};

const StatusBadge = ({
	status,
	className = "",
}: {
	status: ListingStatus;
	className?: string;
}) => (
	<span
		className={`inline-flex items-center px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-md whitespace-nowrap ${STYLES[status]} ${className}`}
	>
		{STATUS_LABELS[status]}
	</span>
);

export default StatusBadge;
