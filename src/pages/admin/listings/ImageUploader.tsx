import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import { LIMITS } from "@convex/shared";
import { useMutation } from "convex/react";
import {
	ChevronLeft,
	ChevronRight,
	ImagePlus,
	Loader2,
	Star,
	Trash2,
} from "lucide-react";
import { type DragEvent, useRef, useState } from "react";
import { toast } from "sonner";
import type { ListingImage } from "@/shared/types/types";
import { compressImage, uploadToStorage } from "./imageUpload";

export interface Photo {
	key: string;
	ref: ListingImage;
	url: string;
}

interface Pending {
	key: string;
	preview: string;
	progress: number;
}

interface ImageUploaderProps {
	photos: Photo[];
	onChange: (update: (photos: Photo[]) => Photo[]) => void;
	/** Called with storage IDs uploaded in this session, so they can be cleaned up if unsaved. */
	onUploaded: (storageId: Id<"_storage">) => void;
	onBusyChange: (busy: boolean) => void;
	maxImages?: number;
}

const ImageUploader = ({
	photos,
	onChange,
	onUploaded,
	onBusyChange,
	maxImages = LIMITS.images,
}: ImageUploaderProps) => {
	const generateUploadUrl = useMutation(api.listings.generateUploadUrl);
	const [pending, setPending] = useState<Pending[]>([]);
	const [dragging, setDragging] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const activeUploads = useRef(0);

	const remaining = maxImages - photos.length - pending.length;

	const uploadFiles = async (files: File[]) => {
		const images = files.filter((f) => f.type.startsWith("image/"));
		if (images.length < files.length)
			toast.error("Only image files can be uploaded.");
		if (images.length > remaining) {
			toast.error(
				`You can add ${Math.max(remaining, 0)} more photo(s) (max ${maxImages}).`,
			);
		}
		const batch = images.slice(0, Math.max(remaining, 0));
		if (batch.length === 0) return;

		activeUploads.current += batch.length;
		onBusyChange(true);

		await Promise.all(
			batch.map(async (file) => {
				const key = crypto.randomUUID();
				const preview = URL.createObjectURL(file);
				setPending((prev) => [...prev, { key, preview, progress: 0 }]);
				try {
					const blob = await compressImage(file);
					if (blob.size > LIMITS.imageBytes) {
						throw new Error(
							`${file.name} is too large even after compression.`,
						);
					}
					const uploadUrl = await generateUploadUrl();
					const storageId = await uploadToStorage(uploadUrl, blob, (progress) =>
						setPending((prev) =>
							prev.map((p) => (p.key === key ? { ...p, progress } : p)),
						),
					);
					onUploaded(storageId);
					onChange((prev) => [
						...prev,
						{ key, ref: { kind: "storage", storageId }, url: preview },
					]);
				} catch (error) {
					URL.revokeObjectURL(preview);
					toast.error(
						error instanceof Error ? error.message : "Upload failed.",
					);
				} finally {
					setPending((prev) => prev.filter((p) => p.key !== key));
					activeUploads.current -= 1;
					if (activeUploads.current === 0) onBusyChange(false);
				}
			}),
		);
	};

	const move = (index: number, delta: number) =>
		onChange((prev) => {
			const next = [...prev];
			const target = index + delta;
			if (target < 0 || target >= next.length) return prev;
			[next[index], next[target]] = [next[target], next[index]];
			return next;
		});

	const makeCover = (index: number) =>
		onChange((prev) => [prev[index], ...prev.filter((_, i) => i !== index)]);

	const removePhoto = (key: string) =>
		onChange((prev) => prev.filter((p) => p.key !== key));

	const handleDrop = (e: DragEvent) => {
		e.preventDefault();
		setDragging(false);
		void uploadFiles(Array.from(e.dataTransfer.files));
	};

	return (
		<div className="space-y-4">
			<button
				type="button"
				onClick={() => inputRef.current?.click()}
				onDragOver={(e) => {
					e.preventDefault();
					setDragging(true);
				}}
				onDragLeave={() => setDragging(false)}
				onDrop={handleDrop}
				disabled={remaining <= 0}
				className={`w-full flex flex-col items-center justify-center gap-2 py-10 px-6 rounded-2xl border-2 border-dashed transition-colors disabled:opacity-50 ${
					dragging
						? "border-primary-500 bg-primary-50"
						: "border-slate-200 hover:border-primary-300 hover:bg-slate-50"
				}`}
			>
				<ImagePlus size={32} className="text-primary-500" />
				<span className="font-semibold text-slate-700">
					Drop photos here or click to browse
				</span>
				<span className="text-xs text-slate-500">
					JPG, PNG or WebP · resized to 1920px and compressed automatically ·{" "}
					{photos.length}/{maxImages}
				</span>
			</button>
			<input
				ref={inputRef}
				type="file"
				accept="image/*"
				multiple
				hidden
				onChange={(e) => {
					void uploadFiles(Array.from(e.target.files ?? []));
					e.target.value = "";
				}}
			/>

			{(photos.length > 0 || pending.length > 0) && (
				<ul className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
					{photos.map((photo, index) => (
						<li
							key={photo.key}
							className="relative group aspect-4/3 rounded-xl overflow-hidden bg-slate-100 ring-1 ring-slate-200"
						>
							<img
								src={photo.url}
								alt=""
								className="w-full h-full object-cover"
							/>
							{index === 0 && (
								<span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-primary-600 text-snow text-[10px] font-bold uppercase tracking-wider">
									Cover
								</span>
							)}
							<div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-1 p-1.5 bg-linear-to-t from-black/70 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100 transition-opacity">
								<div className="flex gap-1">
									<button
										type="button"
										onClick={() => move(index, -1)}
										disabled={index === 0}
										aria-label="Move left"
										className="p-1.5 rounded-md bg-white/90 text-slate-700 disabled:opacity-40"
									>
										<ChevronLeft size={14} />
									</button>
									<button
										type="button"
										onClick={() => move(index, 1)}
										disabled={index === photos.length - 1}
										aria-label="Move right"
										className="p-1.5 rounded-md bg-white/90 text-slate-700 disabled:opacity-40"
									>
										<ChevronRight size={14} />
									</button>
									{index !== 0 && (
										<button
											type="button"
											onClick={() => makeCover(index)}
											aria-label="Make cover photo"
											title="Make cover photo"
											className="p-1.5 rounded-md bg-white/90 text-slate-700"
										>
											<Star size={14} />
										</button>
									)}
								</div>
								<button
									type="button"
									onClick={() => removePhoto(photo.key)}
									aria-label="Remove photo"
									className="p-1.5 rounded-md bg-white/90 text-rose-600"
								>
									<Trash2 size={14} />
								</button>
							</div>
						</li>
					))}
					{pending.map((p) => (
						<li
							key={p.key}
							className="relative aspect-4/3 rounded-xl overflow-hidden bg-slate-100"
						>
							<img
								src={p.preview}
								alt=""
								className="w-full h-full object-cover opacity-50"
							/>
							<div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
								<Loader2 size={22} className="animate-spin text-primary-600" />
								<div className="w-2/3 h-1.5 rounded-full bg-white/80 overflow-hidden">
									<div
										className="h-full bg-primary-600 transition-all"
										style={{ width: `${Math.round(p.progress * 100)}%` }}
									/>
								</div>
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default ImageUploader;
