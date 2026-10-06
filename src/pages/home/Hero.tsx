import { MapPin, Search } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import hero from "@/shared/images/home/hero.webp";

const Hero: React.FC = () => {
	const [query, setQuery] = useState("");
	const navigate = useNavigate();

	const handleSearch = () => {
		if (query.trim()) {
			navigate(`/featured?q=${encodeURIComponent(query)}`);
		} else {
			navigate("/featured");
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			handleSearch();
		}
	};

	return (
		<section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
			{/* Background Image */}
			<div className="absolute inset-0 z-0">
				<img
					src={hero}
					alt="Modern Architecture"
					className="w-full h-full object-cover object-center"
				/>
				<div className="absolute inset-0 bg-linear-to-r from-slate-900/80 to-slate-900/30"></div>
			</div>

			<div className="container relative z-10 mx-auto px-6">
				<div className="max-w-3xl">
					<h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
						Find Your Perfect <br />
						<span className="text-logo">Property Match</span>
					</h1>
					<p className="text-lg text-slate-100 mb-10 max-w-xl shadow-sm">
						We offer a curated list of modern properties. Whether you are buying
						or renting, find a space that truly feels like home.
					</p>

					{/* Search Box */}
					<div className="bg-white p-3 rounded-2xl shadow-2xl max-w-2xl flex flex-col md:flex-row items-center gap-3">
						<div className="flex-1 w-full relative">
							<MapPin
								className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
								size={20}
							/>
							<input
								type="text"
								value={query}
								onChange={(e) => setQuery(e.target.value)}
								onKeyDown={handleKeyDown}
								placeholder="City, Neighborhood, or Address"
								className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-xl outline-none text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-primary-100 transition-all"
							/>
						</div>

						<div className="w-full md:w-auto">
							<button
								onClick={handleSearch}
								type="button"
								className="w-full md:w-auto bg-primary-700 hover:bg-primary-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
							>
								<Search size={20} />
								Search
							</button>
						</div>
					</div>

					<div className="mt-8 flex flex-wrap items-center gap-6 md:gap-8 text-white/90 text-sm">
						<div className="flex items-center gap-2">
							<span className="text-2xl font-bold text-white">1,200+</span>
							<span className="leading-tight">
								Premium
								<br />
								Properties
							</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="text-2xl font-bold text-white">4,500+</span>
							<span className="leading-tight">
								Happy
								<br />
								Clients
							</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="text-2xl font-bold text-white">240</span>
							<span className="leading-tight">
								Award
								<br />
								Winning
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
