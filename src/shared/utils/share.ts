import { toast } from "sonner";

/** Shares via the native share sheet when available, else copies the link. */
export async function shareLink({
	title,
	url = window.location.href,
}: {
	title: string;
	url?: string;
}) {
	if (navigator.share) {
		try {
			await navigator.share({ title, url });
			return;
		} catch (error) {
			if ((error as DOMException).name === "AbortError") return;
		}
	}
	try {
		await navigator.clipboard.writeText(url);
		toast.success("Link copied to clipboard");
	} catch {
		toast.error("Couldn't copy the link");
	}
}
