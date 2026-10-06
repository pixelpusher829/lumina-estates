import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface LightboxProps {
	open: boolean;
	images: string[];
	title: string;
	index: number;
	onIndexChange: (index: number) => void;
	onClose: () => void;
}

const Lightbox = ({
	open,
	images,
	title,
	index,
	onIndexChange,
	onClose,
}: LightboxProps) => {
	const count = images.length;
	const touchStart = useRef<number | null>(null);
	const stateRef = useRef({ index, count, onIndexChange, onClose });
	stateRef.current = { index, count, onIndexChange, onClose };

	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => {
			const { index, count, onIndexChange, onClose } = stateRef.current;
			if (e.key === "Escape") onClose();
			if (e.key === "ArrowRight") onIndexChange((index + 1) % count);
			if (e.key === "ArrowLeft") onIndexChange((index - 1 + count) % count);
		};
		document.addEventListener("keydown", onKey);
		const overflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", onKey);
			document.body.style.overflow = overflow;
		};
	}, [open]);

	if (!open || count === 0) return null;

	const go = (delta: number) => onIndexChange((index + delta + count) % count);

	return createPortal(
		<div
			className="fixed inset-0 z-100 bg-slate-950/95 flex flex-col animate-fade-in"
			role="dialog"
			aria-modal="true"
			aria-label={`${title} photo gallery`}
		>
			<div className="flex items-center justify-between p-4 text-white">
				<span className="text-sm font-medium">
					{index + 1} / {count}
				</span>
				<span className="hidden sm:block text-sm text-white/70 truncate px-4">
					{title}
				</span>
				<button
					type="button"
					onClick={onClose}
					aria-label="Close gallery"
					className="p-2 rounded-full hover:bg-white/10 transition-colors"
				>
					<X size={24} />
				</button>
			</div>

			<div
				className="relative flex-1 min-h-0 flex items-center justify-center px-4 sm:px-16"
				onTouchStart={(e) => {
					touchStart.current = e.touches[0].clientX;
				}}
				onTouchEnd={(e) => {
					if (touchStart.current === null) return;
					const delta = e.changedTouches[0].clientX - touchStart.current;
					if (Math.abs(delta) > 50) go(delta < 0 ? 1 : -1);
					touchStart.current = null;
				}}
			>
				<img
					key={images[index]}
					src={images[index]}
					alt={`${title} (${index + 1} of ${count})`}
					className="max-w-full max-h-full object-contain rounded-lg animate-fade-in select-none"
				/>
				{count > 1 && (
					<>
						<button
							type="button"
							onClick={() => go(-1)}
							aria-label="Previous photo"
							className="absolute left-2 sm:left-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
						>
							<ChevronLeft size={28} />
						</button>
						<button
							type="button"
							onClick={() => go(1)}
							aria-label="Next photo"
							className="absolute right-2 sm:right-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
						>
							<ChevronRight size={28} />
						</button>
					</>
				)}
			</div>

			{count > 1 && (
				<div className="flex gap-2 p-4 overflow-x-auto no-scrollbar justify-start sm:justify-center">
					{images.map((src, i) => (
						<button
							key={src}
							type="button"
							onClick={() => onIndexChange(i)}
							aria-label={`View photo ${i + 1}`}
							className={`shrink-0 w-16 h-12 rounded-md overflow-hidden ring-2 transition ${i === index ? "ring-white" : "ring-transparent opacity-50 hover:opacity-100"}`}
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
		</div>,
		document.body,
	);
};

export default Lightbox;
