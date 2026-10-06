import type React from "react";
import AgentsSection from "@/features/agents-section";
import Seo from "@/shared/components/Seo";

const Agents: React.FC = () => {
	return (
		<div className="min-h-screen pt-28 pb-20">
			<Seo
				title="Our Agents"
				description="Meet our experienced real estate agents."
			/>
			<AgentsSection />
		</div>
	);
};

export default Agents;
