import { api } from "@convex/_generated/api";
import type { Doc } from "@convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Copy, Download, Mail, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import PageLoader from "@/shared/components/PageLoader";
import Seo from "@/shared/components/Seo";
import { errorMessage, formatDate } from "@/shared/utils/format";
import ConfirmDialog from "../components/ConfirmDialog";
import PageHeader from "../components/PageHeader";

const AdminSubscribers = () => {
	const subscribers = useQuery(api.subscribers.list);
	const remove = useMutation(api.subscribers.remove);
	const [toDelete, setToDelete] = useState<Doc<"subscribers"> | null>(null);

	if (subscribers === undefined) return <PageLoader />;

	const copyAll = async () => {
		try {
			await navigator.clipboard.writeText(
				subscribers.map((s) => s.email).join(", "),
			);
			toast.success(`Copied ${subscribers.length} email addresses`);
		} catch {
			toast.error("Couldn't copy to clipboard");
		}
	};

	const exportCsv = () => {
		const rows = [
			"email,subscribed_at",
			...subscribers.map(
				(s) => `${s.email},${new Date(s._creationTime).toISOString()}`,
			),
		];
		const url = URL.createObjectURL(
			new Blob([rows.join("\n")], { type: "text/csv" }),
		);
		const link = document.createElement("a");
		link.href = url;
		link.download = `lumina-subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
		link.click();
		URL.revokeObjectURL(url);
	};

	return (
		<div>
			<Seo title="Subscribers · Admin" />
			<PageHeader
				title="Newsletter subscribers"
				description={`${subscribers.length} ${subscribers.length === 1 ? "person has" : "people have"} signed up via the website footer.`}
				actions={
					subscribers.length > 0 && (
						<>
							<button type="button" className="btn-secondary" onClick={copyAll}>
								<Copy size={16} />{" "}
								<span className="hidden sm:inline">Copy emails</span>
							</button>
							<button
								type="button"
								className="btn-secondary"
								onClick={exportCsv}
							>
								<Download size={16} />{" "}
								<span className="hidden sm:inline">Export CSV</span>
							</button>
						</>
					)
				}
			/>

			{subscribers.length === 0 ? (
				<div className="bg-white rounded-2xl border border-slate-200 text-center py-20 px-6">
					<Mail size={40} className="mx-auto text-slate-300 mb-4" />
					<p className="text-slate-500">No subscribers yet.</p>
				</div>
			) : (
				<ul className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100">
					{subscribers.map((subscriber) => (
						<li
							key={subscriber._id}
							className="flex items-center gap-4 px-5 py-3"
						>
							<a
								href={`mailto:${subscriber.email}`}
								className="flex-1 min-w-0 truncate font-medium text-slate-800 hover:text-primary-700"
							>
								{subscriber.email}
							</a>
							<span className="text-sm text-slate-500 whitespace-nowrap hidden sm:inline">
								{formatDate(subscriber._creationTime)}
							</span>
							<button
								type="button"
								onClick={() => setToDelete(subscriber)}
								aria-label={`Remove ${subscriber.email}`}
								className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
							>
								<Trash2 size={16} />
							</button>
						</li>
					))}
				</ul>
			)}

			<ConfirmDialog
				open={toDelete !== null}
				title="Remove subscriber?"
				description={`${toDelete?.email ?? ""} will be removed from the mailing list.`}
				confirmLabel="Remove"
				onClose={() => setToDelete(null)}
				onConfirm={async () => {
					if (!toDelete) return;
					try {
						await remove({ id: toDelete._id });
						toast.success("Subscriber removed");
					} catch (error) {
						toast.error(errorMessage(error));
					}
				}}
			/>
		</div>
	);
};

export default AdminSubscribers;
