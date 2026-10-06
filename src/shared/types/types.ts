import type { api } from "@convex/_generated/api";
import type { Doc } from "@convex/_generated/dataModel";
import type { FunctionReturnType } from "convex/server";

/** A published listing with resolved photo URLs, as returned to the public site. */
export type Listing = FunctionReturnType<typeof api.listings.list>[number];

export type AdminListing = FunctionReturnType<
	typeof api.listings.adminList
>[number];

export type Enquiry = Doc<"enquiries">;

export type {
	EnquiryKind,
	EnquiryStatus,
	ListingStatus,
	ListingType,
} from "@convex/shared";

export type ListingImage = Listing["photos"][number]["ref"];
