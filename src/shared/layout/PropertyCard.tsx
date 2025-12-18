import React from "react";
import { Link } from "react-router";
import { Heart, MapPin, Bed, Bath, Move, ArrowUpRight } from "lucide-react";
import { Property } from "@/shared/types";

interface PropertyCardProps {
	property: Property;
	isFavorite: boolean;
	onToggleFavorite: (e: React.MouseEvent, id: string) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
	property,
	isFavorite,
	onToggleFavorite,
}) => {
	return (
		<Link to={`/property/${property.id}`} className="block group">
			<div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
				{/* Image Container */}
				<div className="relative aspect-[4/3] overflow-hidden">
					<img
						src={property.images[0]}
						alt={property.title}
						className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
					/>

					{/* Overlay Gradient */}
					<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>

					{/* Badges */}
					<div className="absolute top-4 left-4 flex gap-2">
						{property.isNew && (
							<span className="px-3 py-1 bg-primary-600 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
								New
							</span>
						)}
						<span className="px-3 py-1 bg-white/90 backdrop-blur text-slate-800 text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
							{property.type}
						</span>
					</div>

					{/* Favorite Button */}
					<button
						onClick={(e) => onToggleFavorite(e, property.id)}
						className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 ${
							isFavorite
								? "bg-rose-500 text-white shadow-lg shadow-rose-500/30"
								: "bg-white/30 text-white hover:bg-white hover:text-rose-500"
						}`}>
						<Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
					</button>

					{/* Price Tag (Bottom Overlay) */}
					<div className="absolute bottom-4 left-4">
						<span className="text-2xl font-bold text-white drop-shadow-md">
							{property.currency}
							{property.price.toLocaleString()}
						</span>
					</div>
				</div>

				{/* Content */}
				<div className="p-6 flex flex-col flex-grow">
					<div className="flex items-start justify-between mb-2">
						<h3 className="text-lg font-bold text-slate-900 group-hover:text-primary-700 transition-colors line-clamp-1">
							{property.title}
						</h3>
						<ArrowUpRight
							size={20}
							className="text-slate-300 group-hover:text-primary-600 transition-colors"
						/>
					</div>

					<div className="flex items-center gap-1 text-slate-500 text-sm mb-6">
						<MapPin size={14} />
						<p className="line-clamp-1">
							{property.address}, {property.city}
						</p>
					</div>

					{/* Divider */}
					<div className="h-px w-full bg-slate-100 mb-6"></div>

					{/* Specs */}
					<div className="flex items-center justify-between text-slate-600 mt-auto">
						<div className="flex items-center gap-2">
							<div className="p-1.5 bg-slate-50 rounded-lg text-primary-600">
								<Bed size={16} />
							</div>
							<span className="text-sm font-semibold">
								{property.specs.beds}{" "}
								<span className="text-slate-400 font-normal text-xs">Beds</span>
							</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="p-1.5 bg-slate-50 rounded-lg text-primary-600">
								<Bath size={16} />
							</div>
							<span className="text-sm font-semibold">
								{property.specs.baths}{" "}
								<span className="text-slate-400 font-normal text-xs">
									Baths
								</span>
							</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="p-1.5 bg-slate-50 rounded-lg text-primary-600">
								<Move size={16} />
							</div>
							<span className="text-sm font-semibold">
								{property.specs.sqft}{" "}
								<span className="text-slate-400 font-normal text-xs">sqft</span>
							</span>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default PropertyCard;
