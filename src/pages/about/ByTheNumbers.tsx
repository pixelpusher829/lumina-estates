import { api } from "@convex/_generated/api";
import { useQuery } from "convex/react";
import SectionHeader from "@/shared/components/SectionHeader";
import { useCountUp } from "@/shared/hooks/useCountUp";
import { formatCompact, formatNumber } from "@/shared/utils/format";

interface LiveStatProps {
	value: number | undefined;
	format: (value: number) => string;
	label: string;
	hint: string;
}

const LiveStat = ({ value, format, label, hint }: LiveStatProps) => {
	const { ref, value: animated } = useCountUp<HTMLDivElement>(value ?? 0);
	return (
		<div ref={ref} className="pt-6 border-t border-slate-200">
			<dt className="sr-only">{label}</dt>
			<dd className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight tabular-nums">
				{value === undefined ? "–" : format(animated)}
			</dd>
			<dd className="mt-3 font-semibold text-slate-900">{label}</dd>
			<dd className="mt-1 text-sm text-slate-500">{hint}</dd>
		</div>
	);
};

const ByTheNumbers = () => {
	const listings = useQuery(api.listings.list);

	const available = listings?.filter(
		(l) => l.status === "for_sale" || l.status === "for_rent",
	);
	const forSale = listings?.filter((l) => l.status === "for_sale") ?? [];
	const averagePrice =
		forSale.length > 0
			? forSale.reduce((sum, l) => sum + l.price, 0) / forSale.length
			: 0;

	const stats: LiveStatProps[] = [
		{
			value: available?.length,
			format: (n) => formatNumber(Math.round(n)),
			label: "Homes on the market",
			hint: "For sale and for rent right now",
		},
		{
			value: listings ? new Set(listings.map((l) => l.city)).size : undefined,
			format: (n) => formatNumber(Math.round(n)),
			label: "Cities covered",
			hint: "From city centres to the coast",
		},
		{
			value: listings ? averagePrice : undefined,
			format: (n) => `$${formatCompact(n)}`,
			label: "Average asking price",
			hint: "Across homes currently for sale",
		},
		{
			value: listings?.reduce((sum, l) => sum + l.sqft, 0),
			format: (n) => formatCompact(Math.round(n)),
			label: "Square feet listed",
			hint: "Total living space on our books",
		},
	];

	return (
		<section className="py-16 md:py-24 lg:py-32 bg-slate-50">
			<div className="container mx-auto px-6">
				<SectionHeader
					title="Lumina by the numbers"
					description="Pulled live from our listings, so these update the moment a home is listed or sold."
					action={
						<span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-sm font-medium text-slate-600">
							<span className="relative flex h-2 w-2">
								<span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
								<span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
							</span>
							Live data
						</span>
					}
				/>
				<dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-8">
					{stats.map((stat) => (
						<LiveStat key={stat.label} {...stat} />
					))}
				</dl>
			</div>
		</section>
	);
};

export default ByTheNumbers;
