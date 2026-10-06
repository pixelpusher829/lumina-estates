import officeImg from "@/shared/images/about/office.webp";
import teamImg from "@/shared/images/about/team.webp";

const Mission = () => {
	return (
		<section className="py-16 md:py-24 relative">
			<div className="container mx-auto px-6">
				<div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
					{/* Text */}
					<div className="lg:w-1/2 relative z-10">
						<h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-6">
							Our mission
						</h2>
						<p className="text-lg text-slate-600 leading-relaxed mb-6">
							We empower our clients with data-driven insights and curated
							opportunities. Whether you're buying your first apartment or
							investing in a portfolio, our goal is to maximise your value and
							your peace of mind.
						</p>
						<p className="text-lg text-slate-600 leading-relaxed">
							Integrity, transparency and innovation are at the core of
							everything we do. We build long-term relationships that extend far
							beyond the closing table.
						</p>
					</div>

					{/* Asymmetrical image cluster */}
					<div className="lg:w-1/2 w-full relative">
						<div className="relative z-10 w-5/6 ml-auto">
							<img
								src={teamImg}
								alt="The Lumina Estates team in a meeting"
								className="rounded-[2.5rem] shadow-2xl w-full object-cover aspect-4/5"
							/>
						</div>
						<div className="absolute -bottom-8 -left-2 sm:-left-4 w-1/2 z-20">
							<img
								src={officeImg}
								alt="Inside the Lumina Estates office"
								loading="lazy"
								className="rounded-3xl shadow-xl border-8 border-white w-full object-cover aspect-square"
							/>
						</div>
						{/* Decorative blob */}
						<div className="absolute -top-12 -right-12 w-64 h-64 bg-emerald-100 rounded-full mix-blend-multiply blur-3xl opacity-50 dark:opacity-10 -z-10" />
					</div>
				</div>
			</div>
		</section>
	);
};

export default Mission;
