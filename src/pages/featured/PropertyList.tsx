import { Search } from "lucide-react";
import { PropertyGridSkeleton } from "@/shared/components/PropertyCardSkeleton";
import PropertyCard from "@/shared/layout/PropertyCard";
import type { Listing } from "@/shared/types/types";

interface PropertyListProps {
	listings: Listing[];
	total: number;
	loading: boolean;
	onClearFilters: () => void;
	onLoadMore: () => void;
}

const PropertyList = ({
	listings,
	total,
	loading,
	onClearFilters,
	onLoadMore,
}: PropertyListProps) => {
	if (loading) return <PropertyGridSkeleton />;

	if (total === 0) {
		return (
			<div className="text-center py-20">
				<div className="text-slate-300 mb-4 flex justify-center">
					<Search size={48} />
				</div>
				<h3 className="text-xl font-bold text-slate-900 mb-2">
					No properties found
				</h3>
				<p className="text-slate-500">
					Try adjusting your search criteria or filters.
				</p>
				<button
					type="button"
					onClick={onClearFilters}
					className="mt-6 text-primary-600 font-medium hover:text-primary-700 underline"
				>
					Clear all filters
				</button>
			</div>
		);
	}

	return (
		<div>
			<h2 className="sr-only">Results</h2>
			<p className="text-sm text-slate-500 mb-6" aria-live="polite">
				Showing{" "}
				<span className="font-semibold text-slate-900">{listings.length}</span>{" "}
				of <span className="font-semibold text-slate-900">{total}</span>{" "}
				{total === 1 ? "property" : "properties"}
			</p>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{listings.map((listing) => (
					<PropertyCard key={listing._id} property={listing} />
				))}
			</div>
			{listings.length < total && (
				<div className="mt-12 text-center">
					<button
						type="button"
						onClick={onLoadMore}
						className="btn-secondary px-8"
					>
						Load more properties
					</button>
				</div>
			)}
		</div>
	);
};

export default PropertyList;
