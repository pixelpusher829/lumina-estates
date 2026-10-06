import { api } from "@convex/_generated/api";
import { useQuery } from "convex/react";
import { Heart } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router";
import { PropertyGridSkeleton } from "@/shared/components/PropertyCardSkeleton";
import Seo from "@/shared/components/Seo";
import { useFavorites } from "@/shared/hooks/useFavorites";
import PropertyCard from "@/shared/layout/PropertyCard";

const Favorites = () => {
	const { favorites, removeFavorites } = useFavorites();
	const listings = useQuery(api.listings.getManyByIds, { ids: favorites });

	// Forget saved listings that have since been removed or unpublished.
	useEffect(() => {
		if (!listings) return;
		const found = new Set<string>(listings.map((l) => l._id));
		const missing = favorites.filter((id) => !found.has(id));
		if (missing.length > 0) removeFavorites(missing);
	}, [listings, favorites, removeFavorites]);

	// Keep the order the user saved them in, most recent first.
	const ordered = listings
		? [...favorites]
				.reverse()
				.map((id) => listings.find((l) => l._id === id))
				.filter((l) => l !== undefined)
		: undefined;

	return (
		<div className="min-h-screen pt-28 pb-20 bg-slate-50">
			<Seo title="Saved properties" />
			<div className="container mx-auto px-6">
				<div className="mb-12 text-center max-w-2xl mx-auto">
					<h1 className="text-4xl font-bold text-slate-900 mb-4">
						Saved Properties
					</h1>
					<p className="text-slate-500">
						Properties you've saved on this device. Tap the heart on any listing
						to add or remove it.
					</p>
				</div>

				{ordered === undefined ? (
					<PropertyGridSkeleton
						count={Math.min(Math.max(favorites.length, 1), 6)}
					/>
				) : ordered.length === 0 ? (
					<div className="text-center py-16">
						<div className="w-16 h-16 mx-auto mb-6 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center">
							<Heart size={32} />
						</div>
						<h2 className="text-xl font-bold text-slate-900 mb-2">
							No saved properties yet
						</h2>
						<p className="text-slate-500 mb-8">
							Browse our listings and tap the heart to save the ones you love.
						</p>
						<Link to="/featured" className="btn-primary">
							Browse properties
						</Link>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{ordered.map((listing) => (
							<PropertyCard key={listing._id} property={listing} />
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Favorites;
