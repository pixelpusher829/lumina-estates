import React, { useState } from "react";
import { Property } from "@/shared/types/types"; // Adjusted path
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";

interface GalleryProps {
	property: Property;
}

const Gallery: React.FC<GalleryProps> = ({ property }) => {
	const [activeImage, setActiveImage] = useState(0);

	const nextImage = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setActiveImage((prev) => (prev + 1) % property.images.length);
	};

	const prevImage = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setActiveImage(
			(prev) => (prev - 1 + property.images.length) % property.images.length,
		);
	};

	// Get the next two images for the side preview
	const sideImages = [1, 2].map((offset) => {
		const index = (activeImage + offset) % property.images.length;
		return { src: property.images[index], index };
	});

	return (
		<div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 mb-8 lg:mb-8 items-stretch h-170 overflow-hidden">
			{/* Main Image Container */}
			<div className="lg:col-span-2 relative w-full h-full rounded-2xl overflow-hidden group">
				<div className="absolute inset-0 w-full h-full">
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
							className="w-10 h-10 flex items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-md hover:scale-110 transition-transform pointer-events-auto cursor-pointer">
							<ChevronLeft size={20} />
						</button>
						<button
							onClick={nextImage}
							className="w-10 h-10 flex items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-md hover:scale-110 transition-transform pointer-events-auto cursor-pointer">
							<ChevronRight size={20} />
						</button>
					</div>

					{/* Counter */}
					<div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 z-10">
						<ImageIcon size={14} />
						{activeImage + 1} / {property.images.length}
					</div>
				</div>
			</div>

			{/* Side Thumbnails Container */}
			<div className="hidden lg:flex flex-col gap-4 h-full w-full overflow-y-auto">
				{sideImages.map((img, idx) => (
					<div
						key={idx}
						className="relative flex-1 rounded-2xl overflow-hidden cursor-pointer group"
						onClick={() => setActiveImage(img.index)}>
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
	);
};

export default Gallery;
