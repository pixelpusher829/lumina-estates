import type { ReactNode } from "react";

const PageHeader = ({
	title,
	description,
	actions,
}: {
	title: string;
	description?: ReactNode;
	actions?: ReactNode;
}) => (
	<div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
		<div>
			<h1 className="text-2xl sm:text-3xl font-bold text-slate-900">{title}</h1>
			{description && <p className="text-slate-500 mt-1">{description}</p>}
		</div>
		{actions && <div className="flex gap-3 shrink-0">{actions}</div>}
	</div>
);

export default PageHeader;
