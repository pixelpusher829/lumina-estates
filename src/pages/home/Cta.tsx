import React from "react";
import { Link } from "react-router";

const Cta: React.FC = () => {
	return (
		<section className="py-20 bg-primary-900 relative overflow-hidden">
			<div className="absolute top-0 right-0 w-1/3 h-full bg-primary-800/30 skew-x-12 transform translate-x-20"></div>
			<div className="container mx-auto px-6 relative z-10 text-center">
				<h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
					Ready to find your dream home?
				</h2>
				<p className="text-primary-100 mb-10 max-w-2xl mx-auto">
					Join thousands of satisfied customers who found their perfect match
					with Lumina Estates.
				</p>
				<Link
					to="/featured"
					className="inline-block px-10 py-4 bg-white text-primary-900 font-bold rounded-xl hover:bg-primary-50 hover:scale-105 transition-all shadow-xl">
					Start Your Search
				</Link>
			</div>
		</section>
	);
};

export default Cta;
