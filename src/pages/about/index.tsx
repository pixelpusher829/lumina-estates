import type React from "react";
import Agents from "@/features/agents-section";
import Seo from "@/shared/components/Seo";
import Hero from "./Hero";
import ImageGrid from "./ImageGrid";
import Mission from "./Mission";

const About: React.FC = () => {
	return (
		<div className="min-h-screen pt-28 pb-20 bg-white">
			<Seo
				title="About Us"
				description="Meet the team behind Lumina Estates and learn about our mission."
			/>
			<Hero />
			<ImageGrid />
			<Mission />
			<Agents />
		</div>
	);
};

export default About;
