import { Mail, Phone } from "lucide-react";
import { type Agent, telHref } from "@/shared/data/agents";

interface AgentCardProps {
	agent: Agent;
}

const AgentCard = ({ agent }: AgentCardProps) => {
	return (
		<div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
			<div className="flex items-center gap-4">
				<img
					src={agent.image}
					alt={agent.name}
					className="w-14 h-14 rounded-full object-cover"
				/>
				<div className="min-w-0">
					<p className="text-xs text-slate-500 font-medium">Listed by</p>
					<h4 className="font-bold text-slate-900">{agent.name}</h4>
					<p className="text-xs text-slate-500">{agent.title}</p>
				</div>
			</div>
			<div className="grid grid-cols-2 gap-2 mt-4">
				<a
					href={telHref(agent.phone)}
					className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-50 text-slate-700 text-sm font-semibold hover:bg-slate-100 transition-colors"
				>
					<Phone size={16} /> Call
				</a>
				<a
					href={`mailto:${agent.email}`}
					className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-50 text-slate-700 text-sm font-semibold hover:bg-slate-100 transition-colors"
				>
					<Mail size={16} /> Email
				</a>
			</div>
		</div>
	);
};

export default AgentCard;
