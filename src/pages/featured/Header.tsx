import type React from "react";

const FeaturedHeader: React.FC = () => {
	return (
		<div className="mb-12 text-center max-w-2xl mx-auto">
			<h1 className="text-4xl font-bold text-slate-900 mb-4">
				Browse Properties
			</h1>
			<p className="text-slate-500">
				Explore our full collection of premium properties. From downtown
				penthouses to suburban family homes, find what fits your lifestyle.
			</p>
		</div>
	);
};

export default FeaturedHeader;
