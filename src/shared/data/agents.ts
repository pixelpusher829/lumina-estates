import { AGENTS as AGENT_IDS } from "@convex/shared";
import alexImg from "@/shared/images/agents/alex-rivera.webp";
import davidImg from "@/shared/images/agents/david-sterling.webp";
import jessicaImg from "@/shared/images/agents/jessica-alba.webp";
import karenImg from "@/shared/images/agents/karen-miller.webp";
import michaelImg from "@/shared/images/agents/michael-chen.webp";
import sarahImg from "@/shared/images/agents/sarah-jenkins.webp";

export interface Agent {
	slug: string;
	name: string;
	title: string;
	phone: string;
	email: string;
	image: string;
}

const DETAILS: Record<
	(typeof AGENT_IDS)[number]["slug"],
	Omit<Agent, "slug" | "name">
> = {
	"sarah-jenkins": {
		title: "Senior Sales Agent",
		phone: "+1 555 0123",
		email: "sarah@luminaestates.com",
		image: sarahImg,
	},
	"david-sterling": {
		title: "Luxury Property Specialist",
		phone: "+1 555 9999",
		email: "david@luminaestates.com",
		image: davidImg,
	},
	"karen-miller": {
		title: "Family Homes Specialist",
		phone: "+1 555 4444",
		email: "karen@luminaestates.com",
		image: karenImg,
	},
	"alex-rivera": {
		title: "Sales Agent",
		phone: "+1 555 7777",
		email: "alex@luminaestates.com",
		image: alexImg,
	},
	"jessica-alba": {
		title: "Coastal Property Agent",
		phone: "+1 555 0888",
		email: "jessica@luminaestates.com",
		image: jessicaImg,
	},
	"michael-chen": {
		title: "Senior Sales Agent",
		phone: "+1 555 0199",
		email: "michael@luminaestates.com",
		image: michaelImg,
	},
};

export const AGENTS: Agent[] = AGENT_IDS.map((agent) => ({
	...agent,
	...DETAILS[agent.slug],
}));

export function getAgent(slug: string): Agent | undefined {
	return AGENTS.find((agent) => agent.slug === slug);
}

export function telHref(phone: string) {
	return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
