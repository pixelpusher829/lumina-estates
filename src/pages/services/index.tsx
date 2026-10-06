import type React from "react";
import Seo from "@/shared/components/Seo";
import Cta from "./Cta";
import Hero from "./Hero";
import Investment from "./Investment";
import PropertyManagement from "./PropertyManagement";
import Residential from "./Residential";

const Services: React.FC = () => {
	return (
		<div className="min-h-screen bg-white overflow-hidden">
			<Seo
				title="Services"
				description="Residential sales, property management and investment advisory."
			/>
			<Hero />
			<Residential />
			<Investment />
			<PropertyManagement />
			<Cta />
		</div>
	);
};

export default Services;
