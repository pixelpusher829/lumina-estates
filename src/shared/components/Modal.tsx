import { X } from "lucide-react";
import { type ReactNode, useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
	open: boolean;
	onClose: () => void;
	title: string;
	description?: ReactNode;
	children: ReactNode;
	size?: "sm" | "md" | "lg";
}

const SIZES = { sm: "max-w-md", md: "max-w-lg", lg: "max-w-2xl" };

const Modal = ({
	open,
	onClose,
	title,
	description,
	children,
	size = "md",
}: ModalProps) => {
	const titleId = useId();
	const panelRef = useRef<HTMLDivElement>(null);
	const onCloseRef = useRef(onClose);
	onCloseRef.current = onClose;

	useEffect(() => {
		if (!open) return;
		const previouslyFocused = document.activeElement as HTMLElement | null;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") onCloseRef.current();
		};
		document.addEventListener("keydown", onKey);
		const overflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		panelRef.current
			?.querySelector<HTMLElement>(
				"input:not([tabindex='-1']), textarea, select, [data-autofocus]",
			)
			?.focus();
		return () => {
			document.removeEventListener("keydown", onKey);
			document.body.style.overflow = overflow;
			previouslyFocused?.focus();
		};
	}, [open]);

	if (!open) return null;

	return createPortal(
		<div className="fixed inset-0 z-100 flex items-end sm:items-center justify-center sm:p-4">
			<button
				type="button"
				aria-label="Close dialog"
				tabIndex={-1}
				className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in cursor-default"
				onClick={onClose}
			/>
			<div
				ref={panelRef}
				role="dialog"
				aria-modal="true"
				aria-labelledby={titleId}
				className={`relative w-full ${SIZES[size]} max-h-[92vh] overflow-y-auto bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 animate-scale-in`}
			>
				<div className="flex items-start justify-between gap-4 mb-6">
					<div className="min-w-0">
						<h2 id={titleId} className="text-xl font-bold text-slate-900">
							{title}
						</h2>
						{description && (
							<div className="text-sm text-slate-500 mt-1">{description}</div>
						)}
					</div>
					<button
						type="button"
						onClick={onClose}
						className="p-2 -m-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
						aria-label="Close"
					>
						<X size={20} />
					</button>
				</div>
				{children}
			</div>
		</div>,
		document.body,
	);
};

export default Modal;
