import type React from "react";

const Hero: React.FC = () => {
	return (
		<div className="container mx-auto px-6 mb-20">
			<div className="max-w-4xl mx-auto text-center">
				<h1 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-8 leading-tight">
					Redefining luxury real estate for the modern era.
				</h1>
				<p className="text-xl text-slate-500 leading-relaxed">
					Lumina Estates was founded on a simple belief: finding a home should
					be an inspiring journey, not a stressful transaction. We combine
					technology, design, and human connection to create a seamless
					experience.
				</p>
			</div>
		</div>
	);
};

export default Hero;
