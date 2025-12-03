import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import PropertyCard from "../components/PropertyCard";
import { Property } from "../types/types";
import { propertyService } from "../services/propertyService";
import {
	ShieldCheck,
	Zap,
	HeartHandshake,
	Home as HomeIcon,
	MapPin,
	Star,
	Quote,
} from "lucide-react";
import { NEIGHBORHOODS, TESTIMONIALS } from "../data/constants";

interface HomeProps {
	favorites: string[];
	toggleFavorite: (id: string) => void;
}

const Home: React.FC<HomeProps> = ({ favorites, toggleFavorite }) => {
	const [properties, setProperties] = useState<Property[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadProperties = async () => {
			try {
				const data = await propertyService.getAllProperties();
				// Just show first 3 for homepage
				setProperties(data.slice(0, 3));
			} catch (error) {
				console.error("Failed to load properties", error);
			} finally {
				setLoading(false);
			}
		};
		loadProperties();
	}, []);

	const handleFavoriteClick = (e: React.MouseEvent, id: string) => {
		e.preventDefault();
		toggleFavorite(id);
	};

	return (
		<div className="min-h-screen">
			<Hero />

			{/* Services Stats Grid */}
			<section className="py-24 bg-white">
				<div className="container mx-auto px-6">
					<div className="text-center max-w-2xl mx-auto mb-16">
						<h2 className="text-3xl font-bold text-slate-900 mb-4">
							Why Choose Lumina
						</h2>
						<p className="text-slate-500">
							Enhance your property listings with our premium
							tools and expert guidance. We make real estate
							simple.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{[
							{
								icon: ShieldCheck,
								title: "Property Insurance",
								desc: "We ensure your asset is protected with top-tier coverage options.",
							},
							{
								icon: Zap,
								title: "Fast Processing",
								desc: "Digital-first workflows mean you get keys in hand faster than ever.",
							},
							{
								icon: HeartHandshake,
								title: "Trusted Advisors",
								desc: "Our agents are top-rated professionals dedicated to your success.",
							},
							{
								icon: HomeIcon,
								title: "Quality Homes",
								desc: "Every listing is verified for quality and accuracy.",
							},
						].map((service, idx) => (
							<div
								key={idx}
								className="p-8 rounded-3xl bg-slate-50 hover:bg-white border border-slate-100 hover:shadow-xl transition-all duration-300 group"
							>
								<div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary-600 mb-6 shadow-sm group-hover:bg-primary-600 group-hover:text-white transition-colors">
									<service.icon size={28} />
								</div>
								<h3 className="text-lg font-bold text-slate-900 mb-3">
									{service.title}
								</h3>
								<p className="text-slate-500 text-sm leading-relaxed">
									{service.desc}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Featured Listings Preview */}
			<section className="py-24 bg-slate-50">
				<div className="container mx-auto px-6">
					<div className="flex justify-between items-end mb-12">
						<div>
							<h2 className="text-3xl font-bold text-slate-900 mb-4">
								Discover Your Perfect Home
							</h2>
							<p className="text-slate-500 max-w-lg">
								Browse our handpicked selection of exclusive
								properties available for sale and rent.
							</p>
						</div>
						<Link
							to="/featured"
							className="hidden md:block px-6 py-3 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors"
						>
							View All Properties
						</Link>
					</div>

					{loading ? (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{[1, 2, 3].map((i) => (
								<div
									key={i}
									className="h-[500px] bg-slate-200 rounded-3xl animate-pulse"
								></div>
							))}
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{properties.map((prop) => (
								<PropertyCard
									key={prop.id}
									property={prop}
									isFavorite={favorites.includes(prop.id)}
									onToggleFavorite={handleFavoriteClick}
								/>
							))}
						</div>
					)}

					<div className="mt-12 text-center md:hidden">
						<Link
							to="/featured"
							className="w-full px-6 py-3 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors inline-block"
						>
							View All Properties
						</Link>
					</div>
				</div>
			</section>

			{/* Neighborhoods Section */}
			<section className="py-24 bg-white overflow-hidden">
				<div className="container mx-auto px-6">
					<div className="text-center max-w-2xl mx-auto mb-16">
						<h2 className="text-3xl font-bold text-slate-900 mb-4">
							Explore Popular Locations
						</h2>
						<p className="text-slate-500">
							From bustling downtowns to serene lakeside retreats,
							find the neighborhood that fits your lifestyle.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{NEIGHBORHOODS.map((hood, idx) => (
							<a
								href={`/featured?q=${hood.name}`}
								key={idx}
								className=""
							>
								<div
									key={idx}
									className="group relative rounded-3xl overflow-hidden aspect-[4/5] cursor-pointer"
								>
									<img
										src={hood.image}
										alt={hood.name}
										className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
									<div className="absolute bottom-0 left-0 p-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
										<h3 className="text-2xl font-bold mb-1">
											{hood.name}
										</h3>
										<p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
											{hood.description}
										</p>
									</div>
								</div>
							</a>
						))}
					</div>
				</div>
			</section>

			{/* Testimonials Section */}
			<section className="py-24 bg-slate-50">
				<div className="container mx-auto px-6">
					<div className="flex flex-col md:flex-row items-center justify-between gap-12">
						<div className="md:w-1/3">
							<h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
								Loved by people <br /> just like you.
							</h2>
							<p className="text-slate-500 mb-8 leading-relaxed">
								We pride ourselves on providing an exceptional
								level of service. Don't just take our word for
								it—hear what our satisfied clients have to say
								about their journey with Lumina.
							</p>
							<Link
								to="/featured"
								className="text-primary-600 font-bold hover:text-primary-700 inline-flex items-center gap-2 group"
							>
								Start your story{" "}
								<span className="group-hover:translate-x-1 transition-transform">
									&rarr;
								</span>
							</Link>
						</div>

						<div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{TESTIMONIALS.map((t, idx) => (
								<div
									key={idx}
									className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
								>
									<div className="text-primary-300 mb-4">
										<Quote size={24} fill="currentColor" />
									</div>
									<p className="text-slate-600 text-sm mb-6 leading-relaxed">
										"{t.quote}"
									</p>
									<div className="flex items-center gap-3">
										<img
											src={t.image}
											alt={t.name}
											className="w-10 h-10 rounded-full object-cover"
										/>
										<div>
											<h4 className="text-sm font-bold text-slate-900">
												{t.name}
											</h4>
											<p className="text-xs text-slate-400">
												{t.role}
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Call to Action */}
			<section className="py-20 bg-primary-900 relative overflow-hidden">
				<div className="absolute top-0 right-0 w-1/3 h-full bg-primary-800/30 skew-x-12 transform translate-x-20"></div>
				<div className="container mx-auto px-6 relative z-10 text-center">
					<h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
						Ready to find your dream home?
					</h2>
					<p className="text-primary-100 mb-10 max-w-2xl mx-auto">
						Join thousands of satisfied customers who found their
						perfect match with Lumina Estates.
					</p>
					<Link
						to="/featured"
						className="inline-block px-10 py-4 bg-white text-primary-900 font-bold rounded-xl hover:bg-primary-50 hover:scale-105 transition-all shadow-xl"
					>
						Start Your Search
					</Link>
				</div>
			</section>
		</div>
	);
};

export default Home;
