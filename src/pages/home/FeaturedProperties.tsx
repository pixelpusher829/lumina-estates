import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import PropertyCard from "@/shared/layout/PropertyCard"; // Adjusted path
import { Property } from "@/shared/types/types"; // Adjusted path
import { propertyService } from "@/shared/services/propertyService"; // Adjusted path

interface FeaturedPropertiesSectionProps {
	favorites: string[];
	onToggleFavorite: (id: string) => void;
}

const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({
	favorites,
	onToggleFavorite,
}) => {
	const [properties, setProperties] = useState<Property[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadProperties = async () => {
			try {
				const data = await propertyService.getAllProperties();
				// Just show first 3 for homepage
				setProperties(data.slice(0, 3));
			} catch (error) {
				console.error("Failed to load properties", error);
			} finally {
				setLoading(false);
			}
		};
		loadProperties();
	}, []);

	const handleFavoriteClick = (e: React.MouseEvent, id: string) => {
		e.preventDefault();
		onToggleFavorite(id);
	};

	return (
		<section className="py-24 bg-slate-50">
			<div className="container mx-auto px-6">
				<div className="flex justify-between items-end mb-12">
					<div>
						<h2 className="text-3xl font-bold text-slate-900 mb-4">
							Discover Your Perfect Home
						</h2>
						<p className="text-slate-500 max-w-lg">
							Browse our handpicked selection of exclusive properties available
							for sale and rent.
						</p>
					</div>
					<Link
						to="/featured"
						className="hidden md:block px-6 py-3 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors">
						View All Properties
					</Link>
				</div>

				{loading ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{[1, 2, 3].map((i) => (
							<div
								key={i}
								className="h-[500px] bg-slate-200 rounded-3xl animate-pulse"></div>
						))}
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{properties.map((prop) => (
							<PropertyCard
								key={prop.id}
								property={prop}
								isFavorite={favorites.includes(prop.id)}
								onToggleFavorite={(e) => handleFavoriteClick(e, prop.id)}
							/>
						))}
					</div>
				)}

				<div className="mt-12 text-center md:hidden">
					<Link
						to="/featured"
						className="w-full px-6 py-3 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors inline-block">
						View All Properties
					</Link>
				</div>
			</div>
		</section>
	);
};

export default FeaturedProperties;
