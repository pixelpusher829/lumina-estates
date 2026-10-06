const PropertyCardSkeleton = () => (
	<div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm animate-pulse">
		<div className="aspect-4/3 bg-slate-200" />
		<div className="p-6 space-y-4">
			<div className="h-5 w-2/3 bg-slate-200 rounded" />
			<div className="h-4 w-1/2 bg-slate-100 rounded" />
			<div className="h-px bg-slate-100" />
			<div className="flex justify-between">
				<div className="h-4 w-14 bg-slate-100 rounded" />
				<div className="h-4 w-14 bg-slate-100 rounded" />
				<div className="h-4 w-14 bg-slate-100 rounded" />
			</div>
		</div>
	</div>
);

const PLACEHOLDER_KEYS = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];

export const PropertyGridSkeleton = ({ count = 6 }: { count?: number }) => (
	<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
		{PLACEHOLDER_KEYS.slice(0, count).map((key) => (
			<PropertyCardSkeleton key={key} />
		))}
	</div>
);

export default PropertyCardSkeleton;
