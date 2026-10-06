import { api } from "@convex/_generated/api";
import { useQuery } from "convex/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import Seo from "@/shared/components/Seo";
import { useDebouncedValue } from "@/shared/hooks/useDebouncedValue";
import Filters from "./Filters";
import { applyFilters, parseFilters } from "./filterUtils";
import Header from "./Header";
import PropertyList from "./PropertyList";

const PAGE_SIZE = 12;

const Featured = () => {
	const listings = useQuery(api.listings.list);
	const [searchParams, setSearchParams] = useSearchParams();
	const filters = useMemo(() => parseFilters(searchParams), [searchParams]);

	const updateParams = useCallback(
		(updates: Record<string, string | number | null>) => {
			setSearchParams(
				(prev) => {
					const next = new URLSearchParams(prev);
					for (const [key, value] of Object.entries(updates)) {
						if (value === null || value === "" || value === "All") {
							next.delete(key);
						} else {
							next.set(key, String(value));
						}
					}
					return next;
				},
				{ replace: true },
			);
		},
		[setSearchParams],
	);

	// Search is typed into local state and pushed to the URL once typing pauses.
	const [searchInput, setSearchInput] = useState(filters.q);
	const debouncedSearch = useDebouncedValue(searchInput, 300);
	const debouncedRef = useRef(debouncedSearch);
	debouncedRef.current = debouncedSearch;

	// Only react to typing; depending on filters.q would echo URL changes back.
	// biome-ignore lint/correctness/useExhaustiveDependencies: see above
	useEffect(() => {
		if (debouncedSearch.trim() !== filters.q) {
			updateParams({ q: debouncedSearch.trim() });
		}
	}, [debouncedSearch]);

	// Pick up search changes that come from outside (e.g. the home hero search).
	useEffect(() => {
		if (filters.q !== debouncedRef.current.trim()) setSearchInput(filters.q);
	}, [filters.q]);

	const clearFilters = () => {
		setSearchInput("");
		setSearchParams({}, { replace: true });
	};

	const filtered = useMemo(
		() => (listings ? applyFilters(listings, filters) : []),
		[listings, filters],
	);

	// Reset pagination whenever the filters change.
	const [visible, setVisible] = useState(PAGE_SIZE);
	const filterKey = searchParams.toString();
	// biome-ignore lint/correctness/useExhaustiveDependencies: reset when filters change
	useEffect(() => setVisible(PAGE_SIZE), [filterKey]);

	return (
		<div className="min-h-screen pt-28 pb-20 bg-slate-50">
			<Seo
				title="Properties"
				description="Browse homes, apartments and villas for sale and rent."
			/>
			<div className="container mx-auto px-6">
				<Header />
				<Filters
					filters={filters}
					searchInput={searchInput}
					onSearchChange={setSearchInput}
					onChange={updateParams}
					onClear={clearFilters}
				/>
				<PropertyList
					listings={filtered.slice(0, visible)}
					total={filtered.length}
					loading={listings === undefined}
					onClearFilters={clearFilters}
					onLoadMore={() => setVisible((v) => v + PAGE_SIZE)}
				/>
			</div>
		</div>
	);
};

export default Featured;
