import React from "react";
import { Link } from "react-router";
import { NEIGHBORHOODS } from "@/shared/data/constants"; // Adjusted path

const Neighborhoods: React.FC = () => {
	return (
		<section className="py-24 bg-white overflow-hidden">
			<div className="container mx-auto px-6">
				<div className="text-center max-w-2xl mx-auto mb-16">
					<h2 className="text-3xl font-bold text-slate-900 mb-4">
						Explore Popular Locations
					</h2>
					<p className="text-slate-500">
						From bustling downtowns to serene lakeside retreats, find the
						neighborhood that fits your lifestyle.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{NEIGHBORHOODS.map((hood, idx) => (
						<Link to={`/featured?q=${hood.name}`} key={idx} className="">
							<div
								key={idx}
								className="group relative rounded-3xl overflow-hidden aspect-[4/5] cursor-pointer">
								<img
									src={hood.image}
									alt={hood.name}
									className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
								<div className="absolute bottom-0 left-0 p-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
									<h3 className="text-2xl font-bold mb-1">{hood.name}</h3>
									<p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
										{hood.description}
									</p>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
};

export default Neighborhoods;
