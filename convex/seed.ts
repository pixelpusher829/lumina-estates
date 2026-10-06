import { internalMutation } from "./_generated/server";
import type { ListingType } from "./shared";

type SeedListing = {
	title: string;
	description: string;
	price: number;
	address: string;
	city: string;
	type: ListingType;
	status: "for_sale";
	featured: boolean;
	beds: number;
	baths: number;
	sqft: number;
	tags: string[];
	highlights: string[];
	agent: string;
	images: string[];
};

// Demo listings from the original prototype. Images are served from /public.
const SEED_LISTINGS: SeedListing[] = [
	{
		title: "Cedar Residence",
		description:
			"A harmonious blend of nature and modern architecture. This cedar-clad residence sits on a wooded lot, offering privacy and tranquility. Features include a chef's kitchen, radiant floor heating, and a spacious outdoor deck.",
		price: 1250000,
		address: "88 Forest Lane, Green Hills",
		city: "Oakwood",
		type: "Villa",
		status: "for_sale",
		featured: false,
		beds: 4,
		baths: 3,
		sqft: 2400,
		tags: ["Garden", "Eco-Friendly", "Garage"],
		highlights: [],
		agent: "michael-chen",
		images: [
			"/images/properties/cedar-residence/featured-1.webp",
			"/images/properties/cedar-residence/featured-2.webp",
			"/images/properties/cedar-residence/featured-3.webp",
			"/images/properties/cedar-residence/featured-4.webp",
			"/images/properties/cedar-residence/featured-5.webp",
			"/images/properties/cedar-residence/featured-6.webp",
		],
	},
	{
		title: "Lakeside Loft",
		description:
			"Industrial chic meets lakeside calm. This converted warehouse loft boasts exposed brick walls, 20-foot ceilings, and direct access to the marina. Ideal for creative professionals looking for an inspiring space.",
		price: 850000,
		address: "42 Marina Way, The Docks",
		city: "Lakeside",
		type: "Studio",
		status: "for_sale",
		featured: false,
		beds: 1,
		baths: 1.5,
		sqft: 1100,
		tags: ["Waterfront", "Loft", "Historic"],
		highlights: [],
		agent: "jessica-alba",
		images: [
			"/images/properties/lakeside-loft/featured-1.webp",
			"/images/properties/lakeside-loft/featured-2.webp",
			"/images/properties/lakeside-loft/featured-3.webp",
			"/images/properties/lakeside-loft/featured-4.webp",
			"/images/properties/lakeside-loft/featured-5.webp",
			"/images/properties/lakeside-loft/featured-6.webp",
			"/images/properties/lakeside-loft/featured-7.webp",
		],
	},
	{
		title: "Modern Glass Penthouse",
		description:
			"The crown jewel of the skyline. This triplex penthouse offers 360-degree views, a private elevator, and a rooftop terrace with a jacuzzi. Designed by world-renowned architects for the ultimate luxury experience.",
		price: 3200000,
		address: "1 Skyline Blvd, Financial District",
		city: "Metropolis",
		type: "Penthouse",
		status: "for_sale",
		featured: true,
		beds: 5,
		baths: 4.5,
		sqft: 4500,
		tags: ["Penthouse", "Luxury", "Concierge"],
		highlights: [],
		agent: "david-sterling",
		images: [
			"/images/properties/modern-glass-penthouse/featured-1.webp",
			"/images/properties/modern-glass-penthouse/featured-2.webp",
			"/images/properties/modern-glass-penthouse/featured-3.webp",
			"/images/properties/modern-glass-penthouse/featured-4.webp",
			"/images/properties/modern-glass-penthouse/featured-5.webp",
			"/images/properties/modern-glass-penthouse/featured-6.webp",
		],
	},
	{
		title: "Skyper Pool Apartment",
		description:
			"Experience luxury living in the heart of the city. This stunning apartment features floor-to-ceiling windows, a private infinity pool, and smart home integration. The open-plan living area is perfect for entertaining, while the master suite offers a sanctuary of calm.",
		price: 1450000,
		address: "124 Cloud Avenue, Downtown",
		city: "Metropolis",
		type: "Apartment",
		status: "for_sale",
		featured: true,
		beds: 3,
		baths: 2,
		sqft: 1850,
		tags: ["Pool", "Smart Home", "View"],
		highlights: [],
		agent: "sarah-jenkins",
		images: [
			"/images/properties/skyper-pool-apartment/featured-1.webp",
			"/images/properties/skyper-pool-apartment/featured-2.webp",
			"/images/properties/skyper-pool-apartment/featured-3.webp",
			"/images/properties/skyper-pool-apartment/featured-4.webp",
			"/images/properties/skyper-pool-apartment/featured-5.webp",
		],
	},
	{
		title: "Suburban Family Haven",
		description:
			"Perfect for growing families. This classic colonial home features a large backyard, a finished basement, and proximity to top-rated schools. Recently renovated kitchen and master bath.",
		price: 950000,
		address: "15 Maple Street",
		city: "Suburbia",
		type: "House",
		status: "for_sale",
		featured: false,
		beds: 4,
		baths: 2.5,
		sqft: 2800,
		tags: ["Family", "School District", "Backyard"],
		highlights: [],
		agent: "karen-miller",
		images: [
			"/images/properties/suburban-family-haven/featured-1.webp",
			"/images/properties/suburban-family-haven/featured-2.webp",
			"/images/properties/suburban-family-haven/featured-3.webp",
			"/images/properties/suburban-family-haven/featured-4.webp",
			"/images/properties/suburban-family-haven/featured-5.webp",
		],
	},
	{
		title: "Minimalist Desert Oasis",
		description:
			"A striking modern structure in the middle of the desert landscape. Features solar power, water recycling, and breathtaking sunset views.",
		price: 1800000,
		address: "77 Dune Road",
		city: "Palm Springs",
		type: "Villa",
		status: "for_sale",
		featured: false,
		beds: 3,
		baths: 3,
		sqft: 3200,
		tags: ["Desert", "Modern", "Pool"],
		highlights: [],
		agent: "alex-rivera",
		images: [
			"/images/properties/minimalist-desert-oasis/featured-1.webp",
			"/images/properties/minimalist-desert-oasis/featured-2.webp",
			"/images/properties/minimalist-desert-oasis/featured-3.webp",
			"/images/properties/minimalist-desert-oasis/featured-4.webp",
			"/images/properties/minimalist-desert-oasis/featured-5.webp",
			"/images/properties/minimalist-desert-oasis/featured-6.webp",
			"/images/properties/minimalist-desert-oasis/featured-7.webp",
			"/images/properties/minimalist-desert-oasis/featured-8.webp",
		],
	},
	{
		title: "Historic Brownstone",
		description:
			"Immaculately restored 19th-century brownstone. Original woodwork, high ceilings, and a private garden oasis in the city.",
		price: 2600000,
		address: "458 West End Ave",
		city: "New York",
		type: "House",
		status: "for_sale",
		featured: false,
		beds: 4,
		baths: 3.5,
		sqft: 3800,
		tags: ["Historic", "Garden", "Fireplace"],
		highlights: [],
		agent: "sarah-jenkins",
		images: [
			"/images/properties/historic-brownstone/featured-1.webp",
			"/images/properties/historic-brownstone/featured-2.webp",
			"/images/properties/historic-brownstone/featured-3.webp",
			"/images/properties/historic-brownstone/featured-4.webp",
			"/images/properties/historic-brownstone/featured-5.webp",
			"/images/properties/historic-brownstone/featured-6.webp",
			"/images/properties/historic-brownstone/featured-7.webp",
			"/images/properties/historic-brownstone/featured-8.webp",
		],
	},
	{
		title: "Beachfront Bungalow",
		description:
			"Step directly onto the sand from your patio. This cozy bungalow offers the ultimate beach lifestyle with modern amenities.",
		price: 1100000,
		address: "22 Ocean Drive",
		city: "Santa Monica",
		type: "Villa",
		status: "for_sale",
		featured: false,
		beds: 2,
		baths: 2,
		sqft: 1500,
		tags: ["Beachfront", "Cozy", "View"],
		highlights: [],
		agent: "jessica-alba",
		images: [
			"/images/properties/beachfront-bungalow/featured-1.webp",
			"/images/properties/beachfront-bungalow/featured-2.webp",
			"/images/properties/beachfront-bungalow/featured-3.webp",
			"/images/properties/beachfront-bungalow/featured-4.webp",
			"/images/properties/beachfront-bungalow/featured-5.webp",
			"/images/properties/beachfront-bungalow/featured-6.webp",
			"/images/properties/beachfront-bungalow/featured-7.webp",
			"/images/properties/beachfront-bungalow/featured-8.webp",
		],
	},
	{
		title: "Alpine Ski Chalet",
		description:
			"The ultimate winter getaway. This timber-frame ski chalet offers direct slope access, a massive stone fireplace, and a heated outdoor terrace for après-ski relaxation.",
		price: 2150000,
		address: "450 Powder Ridge",
		city: "Aspen",
		type: "Villa",
		status: "for_sale",
		featured: true,
		beds: 5,
		baths: 4,
		sqft: 4200,
		tags: ["Ski-in/Ski-out", "Mountain View", "Fireplace"],
		highlights: [],
		agent: "david-sterling",
		images: [
			"/images/properties/alpine-ski-chalet/featured-1.webp",
			"/images/properties/alpine-ski-chalet/featured-2.webp",
			"/images/properties/alpine-ski-chalet/featured-3.webp",
			"/images/properties/alpine-ski-chalet/featured-4.webp",
			"/images/properties/alpine-ski-chalet/featured-5.webp",
			"/images/properties/alpine-ski-chalet/featured-6.webp",
			"/images/properties/alpine-ski-chalet/featured-7.webp",
			"/images/properties/alpine-ski-chalet/featured-8.webp",
		],
	},
];

/**
 * Inserts the demo listings. Safe to re-run: does nothing if listings exist.
 * Usage: bunx convex run seed:run
 */
export const run = internalMutation({
	args: {},
	handler: async (ctx) => {
		const existing = await ctx.db.query("listings").first();
		if (existing) return "Listings already exist, skipping seed.";

		const now = Date.now();
		for (const [index, { images, ...listing }] of SEED_LISTINGS.entries()) {
			await ctx.db.insert("listings", {
				...listing,
				slug: listing.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
				images: images.map((url) => ({ kind: "url" as const, url })),
				updatedAt: now - index,
			});
		}
		return `Seeded ${SEED_LISTINGS.length} listings.`;
	},
});
