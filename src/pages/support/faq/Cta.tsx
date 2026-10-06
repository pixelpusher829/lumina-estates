import type React from "react";
import { Link } from "react-router";

const FaqCta: React.FC = () => {
	return (
		<div className="palette-light mt-16 bg-primary-900 rounded-3xl p-8 md:p-12 text-center text-snow relative overflow-hidden">
			<div className="absolute top-0 right-0 w-64 h-64 bg-primary-700 rounded-full blur-3xl -mr-20 -mt-20 opacity-50"></div>
			<div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-700 rounded-full blur-3xl -ml-20 -mb-20 opacity-50"></div>

			<div className="relative z-10">
				<h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
				<p className="text-primary-200 mb-8 max-w-lg mx-auto">
					Can't find the answer you're looking for? Please chat to our friendly
					team.
				</p>
				<Link
					to="/contact"
					className="inline-block px-8 py-3 bg-white text-primary-900 font-bold rounded-xl hover:bg-primary-50 transition-colors shadow-xl"
				>
					Get in Touch
				</Link>
			</div>
		</div>
	);
};

export default FaqCta;
