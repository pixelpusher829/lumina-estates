import { ArrowRight, ArrowUpRight, Briefcase, MapPin } from "lucide-react";
import { Link } from "react-router";
import SectionHeader from "@/shared/components/SectionHeader";
import { CONTACT } from "@/shared/data/constants";

const OPEN_ROLES = [
	{ title: "Senior Sales Agent", location: "Metropolis", type: "Full-time" },
	{ title: "Property Manager", location: "Lakeside", type: "Full-time" },
	{ title: "Marketing Coordinator", location: "Remote", type: "Part-time" },
];

const applyHref = (role: string) =>
	`mailto:${CONTACT.careersEmail}?subject=${encodeURIComponent(`Application: ${role}`)}`;

const Careers = () => {
	return (
		<section className="pb-8">
			<div className="container mx-auto px-6">
				<SectionHeader
					title="Join the team"
					description="We're growing. If you love homes, people and doing things properly, we'd like to hear from you."
					action={
						<Link
							to="/about#team"
							className="inline-flex items-center gap-2 font-semibold text-primary-600 hover:text-primary-700 group"
						>
							Meet our agents
							<ArrowRight
								size={18}
								className="transition-transform group-hover:translate-x-1"
							/>
						</Link>
					}
				/>

				<ul className="divide-y divide-slate-100 border-y border-slate-100">
					{OPEN_ROLES.map((role) => (
						<li key={role.title}>
							<a
								href={applyHref(role.title)}
								className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8 py-6 sm:py-8 transition-colors hover:bg-slate-50 -mx-4 px-4 rounded-2xl"
							>
								<h3 className="text-xl md:text-2xl font-bold text-slate-900 sm:flex-1 group-hover:text-primary-600 transition-colors">
									{role.title}
								</h3>
								<div className="flex items-center gap-6 text-sm text-slate-500">
									<span className="inline-flex items-center gap-1.5">
										<MapPin size={16} /> {role.location}
									</span>
									<span className="inline-flex items-center gap-1.5">
										<Briefcase size={16} /> {role.type}
									</span>
								</div>
								<span className="hidden sm:flex w-11 h-11 rounded-full border border-slate-200 items-center justify-center text-slate-500 group-hover:bg-primary-600 group-hover:border-primary-600 group-hover:text-snow transition-colors">
									<ArrowUpRight size={18} />
								</span>
							</a>
						</li>
					))}
				</ul>

				<p className="mt-8 text-slate-500">
					Don't see your role?{" "}
					<a
						href={`mailto:${CONTACT.careersEmail}`}
						className="font-semibold text-primary-600 hover:text-primary-700"
					>
						Send us an open application
					</a>
					.
				</p>
			</div>
		</section>
	);
};

export default Careers;
