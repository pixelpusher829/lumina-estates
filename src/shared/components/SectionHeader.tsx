import type { ReactNode } from "react";

interface SectionHeaderProps {
	title: ReactNode;
	description?: ReactNode;
	/** Optional element (usually a link/button), e.g. "View all". */
	action?: ReactNode;
	/**
	 * "split": label, heading and description on the left with the action on
	 * the right (for full-width sections). "stacked": everything in one column,
	 * action included (for sidebars and narrow columns).
	 */
	layout?: "split" | "stacked";
	className?: string;
}

const titleClass =
	"text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-slate-900 tracking-tight leading-[1.1] text-balance";

/** Section heading used across the site. */
const SectionHeader = ({
	title,
	description,
	action,
	layout = "split",
	className = "mb-14",
}: SectionHeaderProps) => {
	if (layout === "stacked") {
		return (
			<div className={className}>
				<h2 className={titleClass}>{title}</h2>
				{description && (
					<p className="mt-5 text-slate-500 text-lg leading-relaxed">
						{description}
					</p>
				)}
				{action && <div className="mt-8">{action}</div>}
			</div>
		);
	}

	return (
		<div
			className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12 ${className}`}
		>
			<div className="max-w-2xl">
				<h2 className={titleClass}>{title}</h2>
				{description && (
					<p className="mt-5 text-slate-500 text-lg leading-relaxed">
						{description}
					</p>
				)}
			</div>
			{action && <div className="shrink-0 md:pb-1">{action}</div>}
		</div>
	);
};

export default SectionHeader;
