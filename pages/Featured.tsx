import React, { useEffect, useState } from "react";
import PropertyCard from "../components/PropertyCard";
import { Property } from "../types";
import { propertyService } from "../services/propertyService";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";

interface FeaturedProps {
	favorites: string[];
	toggleFavorite: (id: string) => void;
}

const Featured: React.FC<FeaturedProps> = ({ favorites, toggleFavorite }) => {
	const [properties, setProperties] = useState<Property[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchParams, setSearchParams] = useSearchParams();
	const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
	const [filterType, setFilterType] = useState("All");

	useEffect(() => {
		const loadProperties = async () => {
			try {
				const data = await propertyService.getAllProperties();
				setProperties(data);
			} catch (error) {
				console.error("Failed to load properties", error);
			} finally {
				setLoading(false);
			}
		};
		loadProperties();
	}, []);

	// Sync state with URL params if they change (e.g. back button or nav click)
	useEffect(() => {
		const query = searchParams.get("q");
		// Always update searchTerm, defaulting to empty string if null
		setSearchTerm(query || "");
	}, [searchParams]);

	const handleFavoriteClick = (e: React.MouseEvent, id: string) => {
		e.preventDefault();
		toggleFavorite(id);
	};

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearchTerm(value);

		// Optional: Update URL as you type (debouncing recommended for production)
		// For now, we keep local state and URL somewhat separate unless navigated via Hero
		// But if we want to clear the URL param when user clears input manually:
		if (value === "") {
			const newParams = new URLSearchParams(searchParams);
			newParams.delete("q");
			setSearchParams(newParams);
		}
	};

	const clearFilters = () => {
		setSearchTerm("");
		setFilterType("All");
		setSearchParams({}); // Clear URL params
	};

	const filteredProperties = properties.filter((prop) => {
		const matchesSearch =
			prop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			prop.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
			prop.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
			prop.tags.some((tag) =>
				tag.toLowerCase().includes(searchTerm.toLowerCase())
			);

		const matchesType = filterType === "All" || prop.type === filterType;

		return matchesSearch && matchesType;
	});

	const propertyTypes = ["All", "Apartment", "Villa", "Penthouse", "Studio"];

	return (
		<div className="min-h-screen pt-28 pb-20 bg-slate-50">
			<div className="container mx-auto px-6">
				{/* Header */}
				<div className="mb-12 text-center max-w-2xl mx-auto">
					<h1 className="text-4xl font-bold text-slate-900 mb-4">
						Featured Listings
					</h1>
					<p className="text-slate-500">
						Explore our comprehensive collection of premium
						properties. From downtown penthouses to suburban family
						homes, find what fits your lifestyle.
					</p>
				</div>

				{/* Filters */}
				<div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-10">
					<div className="flex flex-col md:flex-row gap-4 items-center justify-between">
						{/* Search */}
						<div className="relative w-full md:w-96">
							<Search
								className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
								size={20}
							/>
							<input
								type="text"
								placeholder="Search by city, address, or name..."
								value={searchTerm}
								onChange={handleSearchChange}
								className="w-full pl-10 pr-10 py-3 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-primary-100 transition-all border border-transparent focus:border-primary-200"
							/>
							{searchTerm && (
								<button
									onClick={() => {
										setSearchTerm("");
										const newParams = new URLSearchParams(
											searchParams
										);
										newParams.delete("q");
										setSearchParams(newParams);
									}}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
								>
									<X size={16} />
								</button>
							)}
						</div>

						{/* Type Filter */}
						<div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
							<div className="flex items-center gap-2 text-slate-500 mr-2">
								<SlidersHorizontal size={20} />
								<span className="hidden md:inline text-sm font-medium">
									Filters:
								</span>
							</div>
							{propertyTypes.map((type) => (
								<button
									key={type}
									onClick={() => setFilterType(type)}
									className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap ${
										filterType === type
											? "bg-primary-600 text-white"
											: "bg-slate-50 text-slate-600 hover:bg-slate-100"
									}`}
								>
									{type}
								</button>
							))}
						</div>
					</div>
				</div>

				{/* Grid */}
				{loading ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{[1, 2, 3, 4, 5, 6].map((i) => (
							<div
								key={i}
								className="h-[450px] bg-slate-200 rounded-3xl animate-pulse"
							></div>
						))}
					</div>
				) : filteredProperties.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{filteredProperties.map((prop) => (
							<PropertyCard
								key={prop.id}
								property={prop}
								isFavorite={favorites.includes(prop.id)}
								onToggleFavorite={handleFavoriteClick}
							/>
						))}
					</div>
				) : (
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
							onClick={clearFilters}
							className="mt-6 text-primary-600 font-medium hover:text-primary-700 underline"
						>
							Clear all filters
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Featured;
