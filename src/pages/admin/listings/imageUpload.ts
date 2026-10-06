import type { Id } from "@convex/_generated/dataModel";

const MAX_DIMENSION = 1920;
const QUALITY = 0.82;

function canvasToBlob(
	canvas: HTMLCanvasElement,
	type: string,
	quality: number,
) {
	return new Promise<Blob | null>((resolve) =>
		canvas.toBlob(resolve, type, quality),
	);
}

/**
 * Resizes an image so its longest edge is at most 1920px and re-encodes it as
 * WebP (or JPEG where WebP encoding isn't supported). Keeps uploads small so
 * the free Convex storage and bandwidth allowance goes a long way.
 */
export async function compressImage(file: File): Promise<Blob> {
	let bitmap: ImageBitmap;
	try {
		bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
	} catch {
		throw new Error(
			`${file.name} isn't a supported image (use JPG, PNG or WebP).`,
		);
	}

	const scale = Math.min(
		1,
		MAX_DIMENSION / Math.max(bitmap.width, bitmap.height),
	);
	const canvas = document.createElement("canvas");
	canvas.width = Math.round(bitmap.width * scale);
	canvas.height = Math.round(bitmap.height * scale);
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Your browser couldn't process this image.");
	ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
	bitmap.close();

	let blob = await canvasToBlob(canvas, "image/webp", QUALITY);
	if (blob?.type !== "image/webp") {
		blob = await canvasToBlob(canvas, "image/jpeg", QUALITY);
	}
	if (!blob) throw new Error("Couldn't compress the image.");

	// Already-optimised small files can come out larger; keep the original then.
	return blob.size < file.size ? blob : file;
}

/** Uploads a blob to Convex storage, reporting progress from 0 to 1. */
export function uploadToStorage(
	uploadUrl: string,
	blob: Blob,
	onProgress: (fraction: number) => void,
): Promise<Id<"_storage">> {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open("POST", uploadUrl);
		xhr.setRequestHeader("Content-Type", blob.type);
		xhr.upload.onprogress = (e) => {
			if (e.lengthComputable) onProgress(e.loaded / e.total);
		};
		xhr.onload = () => {
			if (xhr.status >= 200 && xhr.status < 300) {
				try {
					resolve(JSON.parse(xhr.responseText).storageId);
				} catch {
					reject(new Error("Unexpected response from the upload server."));
				}
			} else {
				reject(new Error(`Upload failed (${xhr.status}).`));
			}
		};
		xhr.onerror = () =>
			reject(new Error("Upload failed. Check your connection."));
		xhr.send(blob);
	});
}
