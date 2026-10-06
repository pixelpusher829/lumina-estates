import { Search } from "lucide-react";
import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router";

const SearchHeader = () => {
	const [query, setQuery] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		const q = query.trim();
		navigate(q ? `/faq?q=${encodeURIComponent(q)}` : "/faq");
	};

	return (
		<div className="palette-light bg-slate-900 text-white py-16 md:py-24 mb-12">
			<div className="container mx-auto px-6 text-center max-w-3xl">
				<h1 className="text-3xl md:text-5xl font-bold mb-6">
					How can we help you?
				</h1>
				<form className="relative max-w-xl mx-auto" onSubmit={handleSubmit}>
					<Search
						className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
						size={20}
					/>
					<label htmlFor="help-search" className="sr-only">
						Search for answers
					</label>
					<input
						id="help-search"
						type="search"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Search for answers… (press Enter)"
						className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all shadow-xl"
					/>
				</form>
			</div>
		</div>
	);
};

export default SearchHeader;
