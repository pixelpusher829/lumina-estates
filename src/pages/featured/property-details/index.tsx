import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { EyeOff, SearchX } from "lucide-react";
import { Link, useParams } from "react-router";
import PageLoader from "@/shared/components/PageLoader";
import Seo from "@/shared/components/Seo";
import PropertyCard from "@/shared/layout/PropertyCard";
import Gallery from "./Gallery";
import InfoSection from "./info-section";
import NavHeader from "./NavHeader";
import Sidebar from "./sidebar";

const SimilarListings = ({ id }: { id: Id<"listings"> }) => {
	const similar = useQuery(api.listings.similar, { id });
	if (!similar || similar.length === 0) return null;
	return (
		<section className="mt-20 pt-12 border-t border-slate-100">
			<h2 className="text-2xl font-bold text-slate-900 mb-8">
				Similar properties
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{similar.map((listing) => (
					<PropertyCard key={listing._id} property={listing} />
				))}
			</div>
		</section>
	);
};

const PropertyDetails = () => {
	const { slug = "" } = useParams<{ slug: string }>();
	const property = useQuery(api.listings.getBySlug, { slug });

	if (property === undefined) {
		return (
			<div className="pt-24">
				<PageLoader label="Loading property…" />
			</div>
		);
	}

	if (property === null) {
		return (
			<div className="min-h-[70vh] flex items-center justify-center pt-24 px-6">
				<Seo title="Property not found" />
				<div className="text-center max-w-md">
					<div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center">
						<SearchX size={28} />
					</div>
					<h1 className="text-2xl font-bold text-slate-900 mb-2">
						Property not found
					</h1>
					<p className="text-slate-500 mb-8">
						This listing may have been sold or removed.
					</p>
					<Link to="/featured" className="btn-primary">
						Browse properties
					</Link>
				</div>
			</div>
		);
	}

	const images = property.photos.map((p) => p.url);

	return (
		<div className="pt-24 pb-20 min-h-screen bg-white">
			<Seo
				title={property.title}
				description={property.description.slice(0, 160)}
				image={images[0]}
			/>
			<div className="container mx-auto px-4 md:px-6 max-w-7xl">
				{property.status === "draft" && (
					<div className="mt-4 flex items-center gap-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 text-sm">
						<EyeOff size={18} className="shrink-0" />
						<span>
							This listing is a <strong>draft</strong> and is only visible to
							admins.{" "}
							<Link
								to={`/admin/listings/${property._id}/edit`}
								className="font-semibold underline"
							>
								Edit listing
							</Link>
						</span>
					</div>
				)}

				<NavHeader property={property} />
				<Gallery title={property.title} images={images} />

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-4 lg:pt-8">
					<InfoSection property={property} />
					<Sidebar property={property} />
				</div>

				<SimilarListings id={property._id} />
			</div>
		</div>
	);
};

export default PropertyDetails;
