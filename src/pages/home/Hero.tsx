import { MapPin, Search } from "lucide-react";
import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import hero from "@/shared/images/home/hero.webp";

const STATS = [
	{ value: "1,200+", label: "Premium properties" },
	{ value: "4,500+", label: "Happy clients" },
	{ value: "240", label: "Industry awards" },
	{ value: "15 yrs", label: "Of local expertise" },
];

const QUICK_SEARCHES = ["Metropolis", "Lakeside", "Aspen", "Penthouse"];

const Hero = () => {
	const [query, setQuery] = useState("");
	const navigate = useNavigate();

	const search = (value: string) => {
		const q = value.trim();
		navigate(q ? `/featured?q=${encodeURIComponent(q)}` : "/featured");
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		search(query);
	};

	return (
		<section className="palette-light relative min-h-160 lg:min-h-[88vh] flex flex-col overflow-hidden">
			{/* Background Image */}
			<div className="absolute inset-0 z-0">
				<img
					src={hero}
					alt="Modern architecture"
					className="w-full h-full object-cover object-center"
					fetchPriority="high"
				/>
				<div className="absolute inset-0 bg-linear-to-r from-slate-900/85 via-slate-900/55 to-slate-900/20" />
				<div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-slate-900/70 to-transparent" />
			</div>

			<div className="relative z-10 flex-1 flex items-center">
				<div className="container mx-auto px-6 pt-32 pb-16 lg:pt-40">
					<div className="max-w-2xl">
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6">
							Find Your Perfect <br />
							<span className="text-logo">Property Match</span>
						</h1>
						<p className="text-lg text-slate-200 mb-10 max-w-xl leading-relaxed">
							We offer a curated list of modern properties. Whether you are
							buying or renting, find a space that truly feels like home.
						</p>

						{/* Search Box */}
						<form
							onSubmit={handleSubmit}
							className="bg-white p-2 rounded-2xl shadow-2xl flex flex-col sm:flex-row items-stretch gap-2"
						>
							<label className="flex-1 relative">
								<span className="sr-only">Search by location</span>
								<MapPin
									className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
									size={20}
								/>
								<input
									type="text"
									value={query}
									onChange={(e) => setQuery(e.target.value)}
									placeholder="City, neighborhood, or address"
									className="w-full h-full min-h-12 pl-12 pr-4 py-3 bg-slate-50 rounded-xl outline-none text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-primary-100 transition-all"
								/>
							</label>
							<button
								type="submit"
								className="bg-primary-700 hover:bg-primary-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
							>
								<Search size={20} />
								Search
							</button>
						</form>

						<div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
							<span className="text-slate-300 mr-1">Popular:</span>
							{QUICK_SEARCHES.map((term) => (
								<button
									key={term}
									type="button"
									onClick={() => search(term)}
									className="px-3 py-1 rounded-full bg-white/10 text-white/90 ring-1 ring-white/15 hover:bg-white/20 transition-colors"
								>
									{term}
								</button>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Stats strip */}
			<div className="relative z-10 border-t border-white/15 bg-slate-900/30 backdrop-blur-md">
				<dl className="container mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-y-2">
					{STATS.map((stat) => (
						<div
							key={stat.label}
							className="py-5 lg:py-8 lg:pl-8 lg:border-l lg:border-white/15 lg:first:pl-0 lg:first:border-l-0"
						>
							<dt className="sr-only">{stat.label}</dt>
							<dd className="text-2xl lg:text-3xl font-bold text-white">
								{stat.value}
							</dd>
							<dd className="text-sm text-slate-300 mt-1">{stat.label}</dd>
						</div>
					))}
				</dl>
			</div>
		</section>
	);
};

export default Hero;
