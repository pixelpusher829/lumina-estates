import { LISTING_TYPES } from "@convex/shared";
import type { Listing } from "@/shared/types/types";

export const SORT_OPTIONS = [
	{ value: "newest", label: "Newest first" },
	{ value: "price-asc", label: "Price: low to high" },
	{ value: "price-desc", label: "Price: high to low" },
	{ value: "size-desc", label: "Largest first" },
] as const;

export const STATUS_OPTIONS = [
	{ value: "", label: "Any status" },
	{ value: "for_sale", label: "For sale" },
	{ value: "for_rent", label: "For rent" },
	{ value: "sold", label: "Sold" },
] as const;

export const PRICE_OPTIONS = [
	100_000, 250_000, 500_000, 750_000, 1_000_000, 1_500_000, 2_000_000,
	3_000_000, 5_000_000,
];

export const BED_OPTIONS = [1, 2, 3, 4, 5];
export const BATH_OPTIONS = [1, 2, 3, 4];

export const TYPE_OPTIONS = ["All", ...LISTING_TYPES];

export interface Filters {
	q: string;
	type: string;
	status: string;
	minPrice: number | null;
	maxPrice: number | null;
	beds: number | null;
	baths: number | null;
	sort: string;
}

const num = (value: string | null) => {
	if (!value) return null;
	const parsed = Number(value);
	return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
};

export function parseFilters(params: URLSearchParams): Filters {
	return {
		q: params.get("q") ?? "",
		type: params.get("type") ?? "All",
		status: params.get("status") ?? "",
		minPrice: num(params.get("min")),
		maxPrice: num(params.get("max")),
		beds: num(params.get("beds")),
		baths: num(params.get("baths")),
		sort: params.get("sort") ?? "newest",
	};
}

/** Number of filters (excluding search and sort) currently applied. */
export function activeFilterCount(filters: Filters) {
	return [
		filters.type !== "All",
		filters.status,
		filters.minPrice,
		filters.maxPrice,
		filters.beds,
		filters.baths,
	].filter(Boolean).length;
}

export function applyFilters(listings: Listing[], filters: Filters) {
	const terms = filters.q.toLowerCase().split(/\s+/).filter(Boolean);

	const results = listings.filter((listing) => {
		const haystack = [
			listing.title,
			listing.city,
			listing.address,
			listing.type,
			...listing.tags,
		]
			.join(" ")
			.toLowerCase();

		return (
			terms.every((term) => haystack.includes(term)) &&
			(filters.type === "All" || listing.type === filters.type) &&
			(!filters.status || listing.status === filters.status) &&
			(filters.minPrice === null || listing.price >= filters.minPrice) &&
			(filters.maxPrice === null || listing.price <= filters.maxPrice) &&
			(filters.beds === null || listing.beds >= filters.beds) &&
			(filters.baths === null || listing.baths >= filters.baths)
		);
	});

	const sorters: Record<string, (a: Listing, b: Listing) => number> = {
		newest: (a, b) => b._creationTime - a._creationTime,
		"price-asc": (a, b) => a.price - b.price,
		"price-desc": (a, b) => b.price - a.price,
		"size-desc": (a, b) => b.sqft - a.sqft,
	};
	return results.sort(sorters[filters.sort] ?? sorters.newest);
}
