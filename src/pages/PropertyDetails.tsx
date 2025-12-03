import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { propertyService } from "../services/propertyService";
import { Property } from "../types/types";
import {
	ArrowLeft,
	MapPin,
	Bed,
	Bath,
	Move,
	CheckCircle2,
	Share2,
	Heart,
	ChevronLeft,
	ChevronRight,
	ImageIcon,
} from "lucide-react";

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
	const [activeImage, setActiveImage] = useState(0);

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

	const nextImage = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setActiveImage((prev) => (prev + 1) % property.images.length);
	};

	const prevImage = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setActiveImage(
			(prev) =>
				(prev - 1 + property.images.length) % property.images.length,
		);
	};

	// Get the next two images for the side preview
	const sideImages = [1, 2].map((offset) => {
		const index = (activeImage + offset) % property.images.length;
		return { src: property.images[index], index };
	});

	return (
		<div className="pt-24 pb-20 min-h-screen bg-white">
			<div className="container mx-auto px-4 md:px-6 max-w-7xl">
				{/* Navigation Header */}
				<div className="flex items-center justify-between py-6">
					<Link
						to="/"
						className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-medium"
					>
						<ArrowLeft size={20} />
						<span className="hidden sm:inline">
							Back to Listings
						</span>
						<span className="sm:hidden">Back</span>
					</Link>
					<div className="flex gap-3">
						<button className="p-2.5 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
							<Share2 size={18} />
						</button>
						<button
							onClick={() => toggleFavorite(property.id)}
							className={`p-2.5 rounded-full border transition-colors ${
								isFavorite
									? "bg-rose-50 border-rose-200 text-rose-500"
									: "bg-white border-slate-200 text-slate-600 hover:border-rose-200 hover:text-rose-500"
							}`}
						>
							<Heart
								size={18}
								fill={isFavorite ? "currentColor" : "none"}
							/>
						</button>
					</div>
				</div>

				{/* Gallery Section */}
				{/* Mobile: Stacked/Slider look. Desktop: 2:1 Grid with consistent spacing and individual rounding */}
				<div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 mb-8 lg:mb-12 h-auto lg:h-[500px]">
					{/* Main Image Container */}
					<div className="lg:col-span-2 relative w-full h-[300px] lg:h-full rounded-2xl overflow-hidden group">
						<img
							src={property.images[activeImage]}
							alt={property.title}
							className="w-full h-full object-cover transition-transform duration-500"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>

						{/* Controls - Always visible on mobile, hover on desktop */}
						<div className="absolute inset-0 flex items-center justify-between px-4 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
							<button
								onClick={prevImage}
								className="w-10 h-10 flex items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-md hover:scale-110 transition-transform pointer-events-auto cursor-pointer"
							>
								<ChevronLeft size={20} />
							</button>
							<button
								onClick={nextImage}
								className="w-10 h-10 flex items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-md hover:scale-110 transition-transform pointer-events-auto cursor-pointer"
							>
								<ChevronRight size={20} />
							</button>
						</div>

						{/* Counter */}
						<div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 z-10">
							<ImageIcon size={14} />
							{activeImage + 1} / {property.images.length}
						</div>
					</div>

					{/* Side Thumbnails Container */}
					<div className="hidden lg:flex flex-col gap-4 h-full">
						{sideImages.map((img, idx) => (
							<div
								key={idx}
								className="relative flex-1 rounded-2xl overflow-hidden cursor-pointer group"
								onClick={() => setActiveImage(img.index)}
							>
								<img
									src={img.src}
									alt="Gallery thumbnail"
									className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
								/>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>

								{/* View All Overlay on last item (optional visual cue) */}
								{idx === 1 && (
									<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
										<div className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg text-sm font-semibold shadow-sm opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
											View Gallery
										</div>
									</div>
								)}
							</div>
						))}
					</div>
				</div>

				{/* Main Content Layout */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
					{/* Left Column (Property Info) - Spans 8 cols */}
					<div className="lg:col-span-8 space-y-8">
						{/* Header */}
						<div>
							<div className="flex flex-wrap items-center gap-3 mb-4">
								<span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider rounded-md">
									{property.type}
								</span>
								{property.isNew && (
									<span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider rounded-md">
										New Listing
									</span>
								)}
							</div>
							<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tight">
								{property.title}
							</h1>
							<div className="flex items-center text-slate-500 font-medium">
								<MapPin
									size={18}
									className="mr-2 text-slate-400"
								/>
								{property.address}, {property.city}
							</div>
						</div>

						<div className="h-px bg-slate-100"></div>

						{/* Stats */}
						<div className="grid grid-cols-3 gap-4">
							<div className="flex flex-col gap-1">
								<span className="flex items-center gap-2 text-slate-900 font-bold text-xl">
									<Bed size={20} className="text-slate-400" />{" "}
									{property.specs.beds}
								</span>
								<span className="text-xs text-slate-500 uppercase tracking-wide">
									Bedrooms
								</span>
							</div>
							<div className="flex flex-col gap-1">
								<span className="flex items-center gap-2 text-slate-900 font-bold text-xl">
									<Bath
										size={20}
										className="text-slate-400"
									/>{" "}
									{property.specs.baths}
								</span>
								<span className="text-xs text-slate-500 uppercase tracking-wide">
									Bathrooms
								</span>
							</div>
							<div className="flex flex-col gap-1">
								<span className="flex items-center gap-2 text-slate-900 font-bold text-xl">
									<Move
										size={20}
										className="text-slate-400"
									/>{" "}
									{property.specs.sqft}
								</span>
								<span className="text-xs text-slate-500 uppercase tracking-wide">
									Square Ft
								</span>
							</div>
						</div>

						<div className="h-px bg-slate-100"></div>

						{/* Description */}
						<div>
							<h3 className="text-xl font-bold text-slate-900 mb-4">
								About this home
							</h3>
							<p className="text-slate-600 leading-relaxed text-lg">
								{property.description}
							</p>
						</div>

						{/* Amenities */}
						<div>
							<h3 className="text-xl font-bold text-slate-900 mb-6">
								Key Amenities
							</h3>
							<div className="grid grid-cols-2 gap-y-4 gap-x-8">
								{property.tags.map((tag) => (
									<div
										key={tag}
										className="flex items-center gap-3"
									>
										<CheckCircle2
											size={20}
											className="text-emerald-500 flex-shrink-0"
										/>
										<span className="text-slate-700 font-medium">
											{tag}
										</span>
									</div>
								))}
							</div>
						</div>

						<div className="h-px bg-slate-100"></div>

						{/* Additional info block to fill space */}
						<div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
							<h4 className="font-bold text-slate-900 mb-2">
								Property Highlights
							</h4>
							<ul className="list-disc list-inside text-slate-600 space-y-1">
								<li>Premium location in {property.city}</li>
								<li>Recently inspected and verified</li>
								<li>High-speed internet ready</li>
								<li>Flexible lease terms available</li>
							</ul>
						</div>
					</div>

					{/* Right Column (Sidebar) - Spans 4 cols */}
					<div className="lg:col-span-4 relative">
						<div className="sticky top-28 space-y-6">
							{/* Pricing Card */}
							<div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/40">
								<div className="mb-6">
									<span className="text-3xl font-bold text-slate-900">
										{property.currency}
										{property.price.toLocaleString()}
									</span>
									<span className="text-slate-500 ml-2">
										/ total price
									</span>
								</div>

								<div className="space-y-3">
									<button className="w-full py-3.5 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/20">
										Request a Tour
									</button>
									<button className="w-full py-3.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors">
										Contact Agent
									</button>
								</div>

								<p className="text-xs text-slate-400 text-center mt-4">
									You won't be charged yet.
								</p>
							</div>

							{/* Agent Card */}
							<div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
								<img
									src={property.agent.image}
									alt={property.agent.name}
									className="w-14 h-14 rounded-full object-cover"
								/>
								<div>
									<p className="text-xs text-slate-500 font-medium">
										Listed by
									</p>
									<h4 className="font-bold text-slate-900">
										{property.agent.name}
									</h4>
									<div className="flex gap-2 mt-1">
										<span className="text-primary-600 cursor-pointer hover:underline text-xs font-semibold">
											View Profile
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PropertyDetails;
