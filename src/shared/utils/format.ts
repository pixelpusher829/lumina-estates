import type { ListingStatus } from "@convex/shared";
import { ConvexError } from "convex/values";

const currency = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	maximumFractionDigits: 0,
});

const number = new Intl.NumberFormat("en-US");

export function formatPrice(price: number, status?: ListingStatus) {
	const formatted = currency.format(price);
	return status === "for_rent" ? `${formatted}/mo` : formatted;
}

export function formatNumber(value: number) {
	return number.format(value);
}

const compact = new Intl.NumberFormat("en-US", {
	notation: "compact",
	maximumFractionDigits: 1,
});

/** 1250000 -> "1.3M", 24300 -> "24.3K". */
export function formatCompact(value: number) {
	return compact.format(value);
}

export function formatDate(timestamp: number) {
	return new Date(timestamp).toLocaleDateString("en-US", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});
}

export function formatRelative(timestamp: number) {
	const seconds = Math.round((Date.now() - timestamp) / 1000);
	if (seconds < 60) return "just now";
	const minutes = Math.round(seconds / 60);
	if (minutes < 60) return `${minutes}m ago`;
	const hours = Math.round(minutes / 60);
	if (hours < 24) return `${hours}h ago`;
	const days = Math.round(hours / 24);
	if (days < 7) return `${days}d ago`;
	return formatDate(timestamp);
}

const NEW_LISTING_DAYS = 14;

export function isNewListing(creationTime: number) {
	return Date.now() - creationTime < NEW_LISTING_DAYS * 24 * 60 * 60 * 1000;
}

/** Turns a thrown Convex/JS error into a message safe to show users. */
export function errorMessage(
	error: unknown,
	fallback = "Something went wrong. Please try again.",
) {
	if (error instanceof ConvexError && typeof error.data === "string") {
		return error.data;
	}
	return fallback;
}
