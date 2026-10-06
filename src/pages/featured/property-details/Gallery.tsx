import {
	ChevronLeft,
	ChevronRight,
	Expand,
	ImageIcon,
	ImageOff,
} from "lucide-react";
import { useState } from "react";
import Lightbox from "./Lightbox";

interface GalleryProps {
	title: string;
	images: string[];
}

const Gallery = ({ title, images }: GalleryProps) => {
	const [activeImage, setActiveImage] = useState(0);
	const [lightboxOpen, setLightboxOpen] = useState(false);
	const count = images.length;

	if (count === 0) {
		return (
			<div className="mb-8 h-72 rounded-2xl bg-slate-100 flex flex-col items-center justify-center gap-2 text-slate-400">
				<ImageOff size={40} />
				<span className="text-sm">No photos yet</span>
			</div>
		);
	}

	const go = (delta: number) =>
		setActiveImage((prev) => (prev + delta + count) % count);

	// Up to three other photos for the side column, without repeats.
	const sideImages = Array.from({ length: Math.min(3, count - 1) }, (_, i) => {
		const index = (activeImage + i + 1) % count;
		return { src: images[index], index };
	});
	const remaining = count - 1 - sideImages.length;

	return (
		<>
			<div
				className={`grid gap-4 mb-8 lg:h-140 lg:grid-rows-[minmax(0,1fr)] ${sideImages.length > 0 ? "lg:grid-cols-3" : ""}`}
			>
				{/* Main image */}
				<div className="palette-light lg:col-span-2 relative h-72 sm:h-96 lg:h-full rounded-2xl overflow-hidden group bg-slate-100">
					<button
						type="button"
						onClick={() => setLightboxOpen(true)}
						className="absolute inset-0 w-full h-full cursor-zoom-in"
						aria-label="Open fullscreen gallery"
					>
						<img
							src={images[activeImage]}
							alt={`${title} (${activeImage + 1} of ${count})`}
							className="w-full h-full object-cover"
						/>
					</button>
					<div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />

					{count > 1 && (
						<div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-4 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity pointer-events-none">
							<button
								onClick={() => go(-1)}
								type="button"
								aria-label="Previous photo"
								className="w-10 h-10 flex items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-md hover:scale-110 transition-transform pointer-events-auto"
							>
								<ChevronLeft size={20} />
							</button>
							<button
								onClick={() => go(1)}
								type="button"
								aria-label="Next photo"
								className="w-10 h-10 flex items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-md hover:scale-110 transition-transform pointer-events-auto"
							>
								<ChevronRight size={20} />
							</button>
						</div>
					)}

					<div className="absolute bottom-4 right-4 flex gap-2 pointer-events-none">
						<span className="bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2">
							<ImageIcon size={14} />
							{activeImage + 1} / {count}
						</span>
						<span className="bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2">
							<Expand size={14} />
							<span className="hidden sm:inline">Fullscreen</span>
						</span>
					</div>
				</div>

				{/* Side thumbnails */}
				{sideImages.length > 0 && (
					<div className="hidden lg:flex flex-col gap-4 h-full min-h-0 overflow-hidden">
						{sideImages.map((img, i) => {
							const isLast = i === sideImages.length - 1 && remaining > 0;
							return (
								<button
									key={img.index}
									type="button"
									className="relative flex-1 min-h-0 rounded-2xl overflow-hidden group"
									onClick={() =>
										isLast ? setLightboxOpen(true) : setActiveImage(img.index)
									}
									aria-label={
										isLast ? "View all photos" : `View photo ${img.index + 1}`
									}
								>
									<img
										src={img.src}
										alt=""
										loading="lazy"
										className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
									/>
									<div
										className={`absolute inset-0 transition-colors ${isLast ? "bg-black/50 group-hover:bg-black/60" : "bg-black/0 group-hover:bg-black/10"}`}
									/>
									{isLast && (
										<span className="absolute inset-0 flex items-center justify-center text-white font-semibold">
											+{remaining + 1} photos
										</span>
									)}
								</button>
							);
						})}
					</div>
				)}
			</div>

			{/* Mobile thumbnail strip */}
			{count > 1 && (
				<div className="lg:hidden -mt-4 mb-8 flex gap-2 overflow-x-auto no-scrollbar">
					{images.map((src, index) => (
						<button
							key={src}
							type="button"
							onClick={() => setActiveImage(index)}
							aria-label={`View photo ${index + 1}`}
							className={`shrink-0 w-20 h-14 rounded-lg overflow-hidden ring-2 transition ${index === activeImage ? "ring-primary-500" : "ring-transparent opacity-70"}`}
						>
							<img
								src={src}
								alt=""
								loading="lazy"
								className="w-full h-full object-cover"
							/>
						</button>
					))}
				</div>
			)}

			<Lightbox
				open={lightboxOpen}
				images={images}
				title={title}
				index={activeImage}
				onIndexChange={setActiveImage}
				onClose={() => setLightboxOpen(false)}
			/>
		</>
	);
};

export default Gallery;
