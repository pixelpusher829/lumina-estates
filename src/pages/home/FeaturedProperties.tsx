import { api } from "@convex/_generated/api";
import { useQuery } from "convex/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { PropertyGridSkeleton } from "@/shared/components/PropertyCardSkeleton";
import SectionHeader from "@/shared/components/SectionHeader";
import PropertyCard from "@/shared/layout/PropertyCard";

const FeaturedProperties = () => {
	const properties = useQuery(api.listings.featured);

	return (
		<section className="py-16 md:py-24 bg-slate-50">
			<div className="container mx-auto px-6">
				<SectionHeader
					title="Homes worth a closer look"
					description="A hand-picked selection of exclusive properties for sale and rent, updated every week by our agents."
					action={
						<Link
							to="/featured"
							className="hidden md:inline-flex btn-secondary whitespace-nowrap hover:text-primary-600"
						>
							View All Properties <ArrowRight size={18} />
						</Link>
					}
				/>

				{properties === undefined ? (
					<PropertyGridSkeleton count={3} />
				) : properties.length === 0 ? (
					<p className="text-slate-500 py-12">
						New properties are coming soon. Check back shortly!
					</p>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{properties.slice(0, 6).map((prop) => (
							<PropertyCard key={prop._id} property={prop} />
						))}
					</div>
				)}

				<div className="mt-12 md:hidden">
					<Link to="/featured" className="btn-secondary w-full">
						View All Properties <ArrowRight size={18} />
					</Link>
				</div>
			</div>
		</section>
	);
};

export default FeaturedProperties;
