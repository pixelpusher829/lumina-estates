const Hero = () => {
	return (
		<div className="relative pt-16 pb-24 lg:pt-24 lg:pb-32 container mx-auto px-6">
			<div className="relative z-10 grid gap-10 lg:grid-cols-12 lg:gap-16 lg:items-end">
				<h1 className="lg:col-span-7 text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.05] tracking-tight text-balance">
					Redefining luxury real estate for the modern era
				</h1>
				<p className="lg:col-span-5 text-lg md:text-xl text-slate-500 leading-relaxed">
					Lumina Estates was founded on a simple belief: finding a home should
					be an inspiring journey, not a stressful transaction. We combine
					technology, design, and human connection to create a seamless
					experience.
				</p>
			</div>

			{/* Soft background glow, as on the services page */}
			<div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply blur-3xl opacity-30 dark:opacity-10" />
			<div className="absolute top-10 right-1/4 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply blur-3xl opacity-30 dark:opacity-10" />
		</div>
	);
};

export default Hero;
