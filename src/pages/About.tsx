import React, { useEffect, useState } from "react";
import {
	Target,
	Users,
	Award,
	TrendingUp,
	Phone,
	Mail,
	MapPin,
} from "lucide-react";
import { propertyService } from "../services/propertyService";
import { Agent } from "../types/types";
import { Link } from "react-router-dom";

const About: React.FC = () => {
	const [agents, setAgents] = useState<Agent[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadAgents = async () => {
			try {
				const properties = await propertyService.getAllProperties();
				// Extract unique agents from properties
				const uniqueAgentsMap = new Map<string, Agent>();
				properties.forEach((p) => {
					if (!uniqueAgentsMap.has(p.agent.name)) {
						uniqueAgentsMap.set(p.agent.name, p.agent);
					}
				});
				setAgents(Array.from(uniqueAgentsMap.values()));
			} catch (error) {
				console.error("Failed to load agents", error);
			} finally {
				setLoading(false);
			}
		};
		loadAgents();
	}, []);

	return (
		<div className="min-h-screen pt-28 pb-20 bg-white">
			{/* Hero */}
			<div className="container mx-auto px-6 mb-20">
				<div className="max-w-4xl mx-auto text-center">
					<span className="text-primary-600 font-bold tracking-wider text-sm uppercase mb-4 block">
						Our Story
					</span>
					<h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-8 leading-tight">
						Redefining luxury real estate for the modern era.
					</h1>
					<p className="text-xl text-slate-500 leading-relaxed">
						Lumina Estates was founded on a simple belief: finding a
						home should be an inspiring journey, not a stressful
						transaction. We combine technology, design, and human
						connection to create a seamless experience.
					</p>
				</div>
			</div>

			{/* Image Grid */}
			<div className="container mx-auto px-6 mb-24">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[500px] md:h-[600px]">
					<div className="md:col-span-2 h-full">
						<img
							src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200"
							alt="Team meeting"
							className="w-full h-full object-cover rounded-3xl"
						/>
					</div>
					<div className="flex flex-col gap-6 h-full">
						<img
							src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=600"
							alt="Office details"
							className="w-full h-1/2 object-cover rounded-3xl"
						/>
						<div className="h-1/2 bg-slate-900 rounded-3xl p-8 flex flex-col justify-center text-white">
							<div className="text-5xl font-bold mb-2">15+</div>
							<div className="text-slate-400 font-medium">
								Years of Excellence
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Mission */}
			<div className="bg-slate-50 py-24 mb-24">
				<div className="container mx-auto px-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
						<div>
							<h2 className="text-3xl font-bold text-slate-900 mb-6">
								Our Mission
							</h2>
							<p className="text-slate-600 leading-relaxed mb-6">
								We strive to empower our clients with
								data-driven insights and curated opportunities.
								Whether you are buying your first apartment or
								investing in a commercial portfolio, our goal is
								to maximize your value and peace of mind.
							</p>
							<p className="text-slate-600 leading-relaxed">
								Integrity, transparency, and innovation are at
								the core of everything we do. We believe in
								building long-term relationships that extend far
								beyond the closing table.
							</p>
						</div>
						<div className="grid grid-cols-2 gap-6">
							<div className="bg-white p-6 rounded-2xl shadow-sm">
								<Target
									className="text-primary-600 mb-4"
									size={32}
								/>
								<h3 className="font-bold text-slate-900 mb-2">
									Precision
								</h3>
								<p className="text-sm text-slate-500">
									Targeted search and marketing strategies.
								</p>
							</div>
							<div className="bg-white p-6 rounded-2xl shadow-sm">
								<Users
									className="text-primary-600 mb-4"
									size={32}
								/>
								<h3 className="font-bold text-slate-900 mb-2">
									Community
								</h3>
								<p className="text-sm text-slate-500">
									Building strong local networks.
								</p>
							</div>
							<div className="bg-white p-6 rounded-2xl shadow-sm">
								<Award
									className="text-primary-600 mb-4"
									size={32}
								/>
								<h3 className="font-bold text-slate-900 mb-2">
									Excellence
								</h3>
								<p className="text-sm text-slate-500">
									Award-winning service standards.
								</p>
							</div>
							<div className="bg-white p-6 rounded-2xl shadow-sm">
								<TrendingUp
									className="text-primary-600 mb-4"
									size={32}
								/>
								<h3 className="font-bold text-slate-900 mb-2">
									Growth
								</h3>
								<p className="text-sm text-slate-500">
									Focus on long-term asset value.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Agents Section */}
			<div className="container mx-auto px-6">
				<div className="text-center max-w-2xl mx-auto mb-16">
					<h2 className="text-4xl font-bold text-slate-900 mb-4">
						Meet Our Agents
					</h2>
					<p className="text-slate-500">
						Our team of dedicated professionals is here to guide you
						through every step of your real estate journey.
					</p>
				</div>

				{loading ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{[1, 2, 3].map((i) => (
							<div
								key={i}
								className="h-96 bg-slate-200 rounded-3xl animate-pulse"
							></div>
						))}
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{agents.map((agent, idx) => (
							<div
								key={idx}
								className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
							>
								<div className="aspect-square overflow-hidden relative">
									<img
										src={agent.image}
										alt={agent.name}
										className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
										<Link
											to="/contact"
											className="w-full py-3 bg-white text-slate-900 font-bold rounded-xl text-center hover:bg-slate-100 transition-colors"
										>
											Contact {agent.name.split(" ")[0]}
										</Link>
									</div>
								</div>
								<div className="p-6">
									<h3 className="text-xl font-bold text-slate-900 mb-1">
										{agent.name}
									</h3>
									<p className="text-slate-500 text-sm mb-6">
										Senior Real Estate Agent
									</p>

									<div className="space-y-3">
										<div className="flex items-center gap-3 text-slate-600">
											<Phone
												size={18}
												className="text-primary-600"
											/>
											<span className="text-sm">
												{agent.phone}
											</span>
										</div>
										<div className="flex items-center gap-3 text-slate-600">
											<Mail
												size={18}
												className="text-primary-600"
											/>
											<span className="text-sm">
												agent@luminaestates.com
											</span>
										</div>
										<div className="flex items-center gap-3 text-slate-600">
											<MapPin
												size={18}
												className="text-primary-600"
											/>
											<span className="text-sm">
												Metropolis, NY
											</span>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default About;
