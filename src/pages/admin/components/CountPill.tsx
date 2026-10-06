/** Small count badge used inside the admin filter tabs. */
const CountPill = ({ count, active }: { count: number; active: boolean }) => (
	<span
		className={`min-w-5 h-5 px-1.5 rounded-full text-[11px] font-bold tabular-nums inline-flex items-center justify-center ${
			active ? "bg-white/20" : "bg-slate-100 text-slate-500"
		}`}
	>
		{count}
	</span>
);

export default CountPill;
