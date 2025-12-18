import React from "react";
import { Property } from "@/shared/types/types";

interface AgentCardProps {
	property: Property;
}

const AgentCard: React.FC<AgentCardProps> = ({ property }) => {
	return (
		<div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
			<img
				src={property.agent.image}
				alt={property.agent.name}
				className="w-14 h-14 rounded-full object-cover"
			/>
			<div>
				<p className="text-xs text-slate-500 font-medium">Listed by</p>
				<h4 className="font-bold text-slate-900">{property.agent.name}</h4>
				<div className="flex gap-2 mt-1">
					<span className="text-primary-600 cursor-pointer hover:underline text-xs font-semibold">
						View Profile
					</span>
				</div>
			</div>
		</div>
	);
};

export default AgentCard;
