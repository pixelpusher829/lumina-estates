import { Search, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import { formatPrice } from "@/shared/utils/format";
import {
	activeFilterCount,
	BATH_OPTIONS,
	BED_OPTIONS,
	type Filters as FilterState,
	PRICE_OPTIONS,
	SORT_OPTIONS,
	STATUS_OPTIONS,
	TYPE_OPTIONS,
} from "./filterUtils";

interface FiltersProps {
	filters: FilterState;
	searchInput: string;
	onSearchChange: (value: string) => void;
	onChange: (updates: Record<string, string | number | null>) => void;
	onClear: () => void;
}

const selectClass =
	"w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all";

const Filters = ({
	filters,
	searchInput,
	onSearchChange,
	onChange,
	onClear,
}: FiltersProps) => {
	const [showMore, setShowMore] = useState(false);
	const activeCount = activeFilterCount(filters);
	const hasAnything = activeCount > 0 || !!filters.q;

	return (
		<div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-100 mb-10 space-y-4">
			<div className="flex flex-col md:flex-row gap-3">
				{/* Search */}
				<div className="relative flex-1">
					<Search
						className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
						size={20}
					/>
					<label htmlFor="listing-search" className="sr-only">
						Search properties
					</label>
					<input
						id="listing-search"
						type="search"
						placeholder="Search by city, address, name or amenity…"
						value={searchInput}
						onChange={(e) => onSearchChange(e.target.value)}
						className="w-full pl-10 pr-10 py-3 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-primary-100 transition-all border border-transparent focus:border-primary-200 [&::-webkit-search-cancel-button]:hidden"
					/>
					{searchInput && (
						<button
							onClick={() => onSearchChange("")}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
							type="button"
							aria-label="Clear search"
						>
							<X size={16} />
						</button>
					)}
				</div>

				<div className="flex gap-3">
					<label htmlFor="listing-sort" className="sr-only">
						Sort by
					</label>
					<select
						id="listing-sort"
						value={filters.sort}
						onChange={(e) =>
							onChange({
								sort: e.target.value === "newest" ? null : e.target.value,
							})
						}
						className={`${selectClass} md:w-52 py-3`}
					>
						{SORT_OPTIONS.map((opt) => (
							<option key={opt.value} value={opt.value}>
								{opt.label}
							</option>
						))}
					</select>
					<button
						type="button"
						onClick={() => setShowMore((v) => !v)}
						aria-expanded={showMore}
						className={`shrink-0 inline-flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-semibold transition-colors ${
							showMore || activeCount > 0
								? "border-primary-200 bg-primary-50 text-primary-700"
								: "border-slate-200 text-slate-600 hover:bg-slate-50"
						}`}
					>
						<SlidersHorizontal size={18} />
						<span className="hidden sm:inline">Filters</span>
						{activeCount > 0 && (
							<span className="min-w-5 h-5 px-1 rounded-full bg-primary-600 text-white text-xs flex items-center justify-center">
								{activeCount}
							</span>
						)}
					</button>
				</div>
			</div>

			{/* Type chips */}
			<div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-1 px-1">
				{TYPE_OPTIONS.map((type) => (
					<button
						key={type}
						onClick={() => onChange({ type })}
						aria-pressed={filters.type === type}
						className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap ${
							filters.type === type
								? "bg-primary-600 text-white"
								: "bg-slate-50 text-slate-600 hover:bg-slate-100"
						}`}
						type="button"
					>
						{type}
					</button>
				))}
			</div>

			{/* Advanced filters */}
			{showMore && (
				<div className="grid grid-cols-2 lg:grid-cols-5 gap-3 pt-4 border-t border-slate-100 animate-fade-in">
					<div>
						<label
							className="text-xs font-semibold text-slate-500 mb-1 block"
							htmlFor="f-status"
						>
							Status
						</label>
						<select
							id="f-status"
							className={selectClass}
							value={filters.status}
							onChange={(e) => onChange({ status: e.target.value })}
						>
							{STATUS_OPTIONS.map((opt) => (
								<option key={opt.value} value={opt.value}>
									{opt.label}
								</option>
							))}
						</select>
					</div>
					<div>
						<label
							className="text-xs font-semibold text-slate-500 mb-1 block"
							htmlFor="f-min"
						>
							Min price
						</label>
						<select
							id="f-min"
							className={selectClass}
							value={filters.minPrice ?? ""}
							onChange={(e) => onChange({ min: e.target.value })}
						>
							<option value="">No min</option>
							{PRICE_OPTIONS.map((p) => (
								<option key={p} value={p}>
									{formatPrice(p)}
								</option>
							))}
						</select>
					</div>
					<div>
						<label
							className="text-xs font-semibold text-slate-500 mb-1 block"
							htmlFor="f-max"
						>
							Max price
						</label>
						<select
							id="f-max"
							className={selectClass}
							value={filters.maxPrice ?? ""}
							onChange={(e) => onChange({ max: e.target.value })}
						>
							<option value="">No max</option>
							{PRICE_OPTIONS.map((p) => (
								<option key={p} value={p}>
									{formatPrice(p)}
								</option>
							))}
						</select>
					</div>
					<div>
						<label
							className="text-xs font-semibold text-slate-500 mb-1 block"
							htmlFor="f-beds"
						>
							Bedrooms
						</label>
						<select
							id="f-beds"
							className={selectClass}
							value={filters.beds ?? ""}
							onChange={(e) => onChange({ beds: e.target.value })}
						>
							<option value="">Any</option>
							{BED_OPTIONS.map((n) => (
								<option key={n} value={n}>
									{n}+
								</option>
							))}
						</select>
					</div>
					<div>
						<label
							className="text-xs font-semibold text-slate-500 mb-1 block"
							htmlFor="f-baths"
						>
							Bathrooms
						</label>
						<select
							id="f-baths"
							className={selectClass}
							value={filters.baths ?? ""}
							onChange={(e) => onChange({ baths: e.target.value })}
						>
							<option value="">Any</option>
							{BATH_OPTIONS.map((n) => (
								<option key={n} value={n}>
									{n}+
								</option>
							))}
						</select>
					</div>
				</div>
			)}

			{hasAnything && (
				<div className="flex justify-end">
					<button
						type="button"
						onClick={onClear}
						className="text-sm font-medium text-slate-500 hover:text-primary-700 inline-flex items-center gap-1"
					>
						<X size={14} /> Clear all
					</button>
				</div>
			)}
		</div>
	);
};

export default Filters;
