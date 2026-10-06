import { Loader2 } from "lucide-react";
import { type ReactNode, useState } from "react";
import Modal from "@/shared/components/Modal";

interface ConfirmDialogProps {
	open: boolean;
	title: string;
	description: ReactNode;
	confirmLabel?: string;
	onConfirm: () => Promise<void> | void;
	onClose: () => void;
}

const ConfirmDialog = ({
	open,
	title,
	description,
	confirmLabel = "Delete",
	onConfirm,
	onClose,
}: ConfirmDialogProps) => {
	const [busy, setBusy] = useState(false);

	const handleConfirm = async () => {
		setBusy(true);
		try {
			await onConfirm();
			onClose();
		} finally {
			setBusy(false);
		}
	};

	return (
		<Modal
			open={open}
			onClose={busy ? () => {} : onClose}
			title={title}
			size="sm"
		>
			<div className="text-slate-600 mb-8">{description}</div>
			<div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
				<button
					type="button"
					className="btn-secondary"
					onClick={onClose}
					disabled={busy}
				>
					Cancel
				</button>
				<button
					type="button"
					data-autofocus
					className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-rose-600 text-white font-semibold rounded-xl hover:bg-rose-700 transition-colors disabled:opacity-60"
					onClick={handleConfirm}
					disabled={busy}
				>
					{busy && <Loader2 size={18} className="animate-spin" />}
					{confirmLabel}
				</button>
			</div>
		</Modal>
	);
};

export default ConfirmDialog;
