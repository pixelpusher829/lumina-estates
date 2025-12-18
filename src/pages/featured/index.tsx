import React, { useEffect, useState } from "react";
import { propertyService } from "@/shared/services/propertyService";
import { Property } from "@/shared/types/types";
import { useSearchParams } from "react-router";

import Header from "./Header";
import Filters from "./Filters";
import PropertyList from "./PropertyList";

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
		setSearchTerm(query || "");
	}, [searchParams]);

	// Update URL param when searchTerm changes
	useEffect(() => {
		const newParams = new URLSearchParams(searchParams);
		if (searchTerm) {
			newParams.set("q", searchTerm);
		} else {
			newParams.delete("q");
		}
		setSearchParams(newParams);
	}, [searchTerm, setSearchParams]);

	const handleFavoriteClick = (id: string) => {
		toggleFavorite(id);
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
				tag.toLowerCase().includes(searchTerm.toLowerCase()),
			);

		const matchesType = filterType === "All" || prop.type === filterType;

		return matchesSearch && matchesType;
	});

	const propertyTypes = ["All", "Apartment", "Villa", "Penthouse", "Studio"];

	return (
		<div className="min-h-screen pt-28 pb-20 bg-slate-50">
			<div className="container mx-auto px-6">
				<Header />
				<Filters
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
					filterType={filterType}
					setFilterType={setFilterType}
					clearFilters={clearFilters}
					propertyTypes={propertyTypes}
				/>
				<PropertyList
					filteredProperties={filteredProperties}
					loading={loading}
					favorites={favorites}
					onToggleFavorite={handleFavoriteClick}
					onClearFilters={clearFilters}
				/>
			</div>
		</div>
	);
};

export default Featured;
