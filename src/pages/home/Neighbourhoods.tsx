import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import SectionHeader from "@/shared/components/SectionHeader";
import { NEIGHBOURHOODS } from "@/shared/data/neighbourhoods";

const Neighbourhoods = () => {
	return (
		<section className="py-16 md:py-24 bg-slate-50 overflow-hidden">
			<div className="container mx-auto px-6">
				<SectionHeader
					title="Find your corner of the map"
					description="From bustling downtowns to serene lakeside retreats, explore the neighbourhoods our clients love most."
					action={
						<Link
							to="/featured"
							className="hidden md:inline-flex btn-secondary whitespace-nowrap hover:text-primary-600"
						>
							Browse all areas
						</Link>
					}
				/>

				<div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
					{NEIGHBOURHOODS.map((hood) => (
						<Link
							to={`/featured?q=${encodeURIComponent(hood.name)}`}
							key={hood.name}
							className="palette-light group relative aspect-3/4 sm:aspect-4/5 rounded-2xl sm:rounded-3xl overflow-hidden"
						>
							<img
								src={hood.image}
								alt={hood.name}
								loading="lazy"
								className="absolute inset-0 w-full h-full object-cover transform-gpu transition-transform duration-700 group-hover:scale-110"
							/>
							<div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
							<div className="hidden sm:flex absolute top-5 right-5 w-10 h-10 rounded-full bg-white/90 text-slate-900 items-center justify-center opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
								<ArrowUpRight size={18} />
							</div>
							<div className="absolute bottom-0 left-0 p-4 sm:p-6 text-white">
								<h3 className="text-lg sm:text-2xl font-bold sm:mb-1">
									{hood.name}
								</h3>
								<p className="hidden sm:block text-white/80 text-sm">
									{hood.description}
								</p>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
};

export default Neighbourhoods;
