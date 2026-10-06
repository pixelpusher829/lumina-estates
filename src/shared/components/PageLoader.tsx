import { Loader2 } from "lucide-react";

const PageLoader = ({ label = "Loading…" }: { label?: string }) => (
	<div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 text-slate-500">
		<Loader2 className="animate-spin text-primary-600" size={28} />
		<span className="text-sm">{label}</span>
	</div>
);

export default PageLoader;
