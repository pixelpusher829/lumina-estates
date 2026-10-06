import {
	ArrowUpRight,
	Bath,
	Bed,
	Heart,
	ImageOff,
	MapPin,
	Move,
} from "lucide-react";
import type React from "react";
import { Link } from "react-router";
import { useFavorites } from "@/shared/hooks/useFavorites";
import type { Listing } from "@/shared/types/types";
import { formatNumber, formatPrice, isNewListing } from "@/shared/utils/format";

interface PropertyCardProps {
	property: Listing;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
	const { isFavorite, toggleFavorite } = useFavorites();
	const favorite = isFavorite(property._id);
	const cover = property.photos[0]?.url;
	const sold = property.status === "sold";

	const handleFavorite = (e: React.MouseEvent) => {
		// The whole card is a link, so don't navigate when saving.
		e.preventDefault();
		e.stopPropagation();
		toggleFavorite(property._id);
	};

	const specs = [
		{ icon: Bed, value: property.beds, label: "Beds" },
		{ icon: Bath, value: property.baths, label: "Baths" },
		{ icon: Move, value: formatNumber(property.sqft), label: "sqft" },
	];

	return (
		<Link to={`/property/${property.slug}`} className="block group h-full">
			<article className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
				{/* Image */}
				<div className="palette-light relative aspect-4/3 overflow-hidden bg-slate-100">
					{cover ? (
						<img
							src={cover}
							alt={property.title}
							loading="lazy"
							decoding="async"
							className={`w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ${sold ? "grayscale-60" : ""}`}
						/>
					) : (
						<div className="w-full h-full flex items-center justify-center text-slate-300">
							<ImageOff size={40} />
						</div>
					)}

					<div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-transparent" />

					{/* Badges */}
					<div className="absolute top-4 left-4 flex flex-wrap gap-2">
						{sold ? (
							<span className="px-3 py-1 bg-rose-600 text-snow text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
								Sold
							</span>
						) : (
							isNewListing(property._creationTime) && (
								<span className="px-3 py-1 bg-emerald-400 text-slate-900 text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
									New
								</span>
							)
						)}
						{property.status === "for_rent" && (
							<span className="px-3 py-1 bg-amber-400 text-amber-950 text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
								For Rent
							</span>
						)}
						<span className="px-3 py-1 bg-white/90 backdrop-blur text-slate-800 text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
							{property.type}
						</span>
					</div>

					<button
						onClick={handleFavorite}
						type="button"
						aria-pressed={favorite}
						aria-label={favorite ? "Remove from saved" : "Save property"}
						className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 ${
							favorite
								? "bg-rose-500 text-white shadow-lg shadow-rose-500/30"
								: "bg-black/20 text-white hover:bg-white hover:text-rose-500"
						}`}
					>
						<Heart size={18} fill={favorite ? "currentColor" : "none"} />
					</button>

					<div className="absolute bottom-4 left-4 right-4">
						<span className="text-2xl font-bold text-white drop-shadow-md">
							{formatPrice(property.price, property.status)}
						</span>
					</div>
				</div>

				{/* Content */}
				<div className="p-6 flex flex-col grow">
					<div className="flex items-start justify-between gap-2 mb-2">
						<h3 className="text-lg font-bold text-slate-900 group-hover:text-primary-700 transition-colors line-clamp-1">
							{property.title}
						</h3>
						<ArrowUpRight
							size={20}
							className="shrink-0 text-slate-300 group-hover:text-primary-500 transition-colors"
						/>
					</div>

					<div className="flex items-center gap-1 text-slate-500 text-sm mb-6">
						<MapPin size={14} className="shrink-0" />
						<p className="line-clamp-1">
							{property.address}, {property.city}
						</p>
					</div>

					<div className="h-px w-full bg-slate-100 mb-6" />

					<div className="flex items-center justify-between text-slate-600 mt-auto">
						{specs.map(({ icon: Icon, value, label }) => (
							<div key={label} className="flex items-center gap-2">
								<div className="p-1.5 bg-emerald-50 rounded-lg text-emerald-500">
									<Icon size={18} />
								</div>
								<span className="text-sm font-semibold">
									{value}{" "}
									<span className="text-slate-500 font-normal text-xs">
										{label}
									</span>
								</span>
							</div>
						))}
					</div>
				</div>
			</article>
		</Link>
	);
};

export default PropertyCard;
