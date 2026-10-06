import { Quote } from "lucide-react";
import { getAgent } from "@/shared/data/agents";

const FOUNDER_SLUG = "david-sterling";

const FounderNote = () => {
	const founder = getAgent(FOUNDER_SLUG);
	if (!founder) return null;

	return (
		<section className="py-16 md:py-24">
			<div className="container mx-auto px-6">
				{/* Stays dark in both themes. */}
				<div className="palette-light relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-8 sm:p-12 lg:p-16">
					<div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-20" />
					<div className="absolute -bottom-32 -left-16 w-80 h-80 bg-emerald-400 rounded-full blur-3xl opacity-10" />

					<div className="relative grid gap-10 lg:grid-cols-12 lg:gap-16 items-center">
						<div className="lg:col-span-4">
							<img
								src={founder.image}
								alt={founder.name}
								loading="lazy"
								className="w-40 sm:w-56 lg:w-full aspect-4/5 object-cover rounded-3xl shadow-2xl"
							/>
						</div>
						<figure className="lg:col-span-8">
							<Quote
								size={40}
								className="text-emerald-400 mb-8"
								fill="currentColor"
							/>
							<blockquote className="text-2xl md:text-3xl lg:text-4xl font-medium text-white leading-snug tracking-tight text-balance">
								We started Lumina because buying a home felt like a transaction
								when it should feel like a beginning. Fifteen years on, every
								agent here still treats each sale as someone's next chapter.
							</blockquote>
							<figcaption className="mt-10">
								<p className="text-lg font-bold text-white">{founder.name}</p>
								<p className="text-slate-400">Founder &amp; {founder.title}</p>
							</figcaption>
						</figure>
					</div>
				</div>
			</div>
		</section>
	);
};

export default FounderNote;
