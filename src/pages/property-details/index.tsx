import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { propertyService } from "@/shared/services/propertyService";
import { Property } from "@/shared/types/types";

import NavHeader from "./NavHeader";
import Gallery from "./Gallery";
import InfoSection from "./info-section";
import Sidebar from "./sidebar";

interface PropertyDetailsProps {
	favorites: string[];
	toggleFavorite: (id: string) => void;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({
	favorites,
	toggleFavorite,
}) => {
	const { id } = useParams<{ id: string }>();
	const [property, setProperty] = useState<Property | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadProperty = async () => {
			if (id) {
				setLoading(true);
				const data = await propertyService.getPropertyById(id);
				if (data) setProperty(data);
				setLoading(false);
			}
		};
		loadProperty();
	}, [id]);

	if (loading)
		return (
			<div className="min-h-screen flex items-center justify-center text-slate-500 pt-20">
				Loading property details...
			</div>
		);
	if (!property)
		return (
			<div className="min-h-screen flex items-center justify-center text-slate-500 pt-20">
				Property not found.
			</div>
		);

	const isFavorite = favorites.includes(property.id);

	return (
		<div className="pt-24 pb-20 min-h-screen bg-white">
			<div className="container mx-auto px-4 md:px-6 max-w-7xl">
				<NavHeader
					propertyId={property.id}
					isFavorite={isFavorite}
					onToggleFavorite={toggleFavorite}
				/>

				<Gallery property={property} />

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-12">
					<InfoSection property={property} />
					<Sidebar property={property} />
				</div>
			</div>
		</div>
	);
};

export default PropertyDetails;
