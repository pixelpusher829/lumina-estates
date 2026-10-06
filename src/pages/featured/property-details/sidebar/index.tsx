import { useState } from "react";
import EnquiryModal from "@/shared/components/EnquiryModal";
import { getAgent } from "@/shared/data/agents";
import type { Listing } from "@/shared/types/types";
import AgentCard from "./AgentCard";
import PricingCard from "./PricingCard";

interface SidebarProps {
	property: Listing;
}

const Sidebar = ({ property }: SidebarProps) => {
	const [enquiry, setEnquiry] = useState<"tour" | "agent" | null>(null);
	const agent = getAgent(property.agent);

	return (
		<aside className="lg:col-span-4">
			<div className="space-y-6">
				<PricingCard
					property={property}
					onRequestTour={() => setEnquiry("tour")}
					onContactAgent={() => setEnquiry("agent")}
				/>
				{agent && <AgentCard agent={agent} />}
			</div>
			<EnquiryModal
				kind={enquiry}
				onClose={() => setEnquiry(null)}
				listing={property}
				agentName={agent?.name}
			/>
		</aside>
	);
};

export default Sidebar;
