// Constants shared between Convex functions and the React app.
// Keep this file free of server-only imports so Vite can bundle it.

export const LISTING_TYPES = [
	"Apartment",
	"House",
	"Villa",
	"Penthouse",
	"Studio",
] as const;
export type ListingType = (typeof LISTING_TYPES)[number];

export const LISTING_STATUSES = [
	"draft",
	"for_sale",
	"for_rent",
	"sold",
] as const;
export type ListingStatus = (typeof LISTING_STATUSES)[number];

export const PUBLISHED_STATUSES = ["for_sale", "for_rent", "sold"] as const;

export const STATUS_LABELS: Record<ListingStatus, string> = {
	draft: "Draft",
	for_sale: "For Sale",
	for_rent: "For Rent",
	sold: "Sold",
};

export const ENQUIRY_KINDS = ["contact", "tour", "agent"] as const;
export type EnquiryKind = (typeof ENQUIRY_KINDS)[number];

export const ENQUIRY_STATUSES = ["new", "read", "archived"] as const;
export type EnquiryStatus = (typeof ENQUIRY_STATUSES)[number];

export const AGENTS = [
	{ slug: "sarah-jenkins", name: "Sarah Jenkins" },
	{ slug: "david-sterling", name: "David Sterling" },
	{ slug: "karen-miller", name: "Karen Miller" },
	{ slug: "alex-rivera", name: "Alex Rivera" },
	{ slug: "jessica-alba", name: "Jessica Alba" },
	{ slug: "michael-chen", name: "Michael Chen" },
] as const;

export const LIMITS = {
	title: 120,
	description: 5000,
	address: 200,
	city: 80,
	tag: 40,
	tags: 20,
	highlight: 160,
	highlights: 12,
	images: 30,
	imageBytes: 5 * 1024 * 1024,
	maxPrice: 1_000_000_000,
	name: 100,
	email: 200,
	phone: 40,
	topic: 80,
	message: 4000,
} as const;

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Quotas for sandboxed demo sessions (this is a portfolio project). */
export const DEMO_LIMITS = {
	listings: 5,
	imagesPerListing: 8,
	/** Demo records are deleted after this long. */
	ttlMs: 24 * 60 * 60 * 1000,
	/** Anonymous accounts are deleted after this long. */
	accountTtlMs: 7 * 24 * 60 * 60 * 1000,
} as const;
