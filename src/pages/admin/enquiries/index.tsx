import { api } from "@convex/_generated/api";
import type { EnquiryStatus } from "@convex/shared";
import { useMutation, useQuery } from "convex/react";
import {
	Archive,
	ArchiveRestore,
	CalendarCheck,
	ChevronDown,
	ExternalLink,
	Inbox,
	Mail,
	MailOpen,
	MessageSquare,
	Phone,
	Reply,
	Trash2,
	User,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import PageLoader from "@/shared/components/PageLoader";
import Seo from "@/shared/components/Seo";
import { getAgent, telHref } from "@/shared/data/agents";
import type { Enquiry } from "@/shared/types/types";
import {
	errorMessage,
	formatDate,
	formatRelative,
} from "@/shared/utils/format";
import ConfirmDialog from "../components/ConfirmDialog";
import CountPill from "../components/CountPill";
import PageHeader from "../components/PageHeader";

const KIND_META = {
	contact: {
		label: "Contact form",
		icon: MessageSquare,
		style: "bg-slate-100 text-slate-700",
	},
	tour: {
		label: "Tour request",
		icon: CalendarCheck,
		style: "bg-emerald-50 text-emerald-700",
	},
	agent: {
		label: "Agent enquiry",
		icon: User,
		style: "bg-primary-50 text-primary-700",
	},
} as const;

const TABS: { value: EnquiryStatus | "all"; label: string }[] = [
	{ value: "new", label: "New" },
	{ value: "read", label: "Read" },
	{ value: "archived", label: "Archived" },
	{ value: "all", label: "All" },
];

const EnquiryRow = ({
	enquiry,
	open,
	onToggle,
	onDelete,
}: {
	enquiry: Enquiry;
	open: boolean;
	onToggle: () => void;
	onDelete: () => void;
}) => {
	const setStatus = useMutation(api.enquiries.setStatus);
	const kind = KIND_META[enquiry.kind];
	const agent = enquiry.agent ? getAgent(enquiry.agent) : undefined;
	const unread = enquiry.status === "new";

	const changeStatus = async (status: EnquiryStatus, message?: string) => {
		try {
			await setStatus({ id: enquiry._id, status });
			if (message) toast.success(message);
		} catch (error) {
			toast.error(errorMessage(error));
		}
	};

	const handleToggle = () => {
		if (!open && unread) void changeStatus("read");
		onToggle();
	};

	const subject = enquiry.listingTitle
		? `Re: ${enquiry.listingTitle}`
		: `Re: ${enquiry.topic ?? "Your enquiry"}`;

	return (
		<li className={unread ? "bg-primary-50/30" : ""}>
			<button
				type="button"
				onClick={handleToggle}
				aria-expanded={open}
				className="w-full text-left flex items-start gap-4 p-4 sm:p-5 hover:bg-slate-50 transition-colors"
			>
				<span
					className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${unread ? "bg-primary-600" : "bg-transparent"}`}
					aria-hidden="true"
				/>
				{unread && <span className="sr-only">Unread</span>}
				<div className="min-w-0 flex-1">
					<div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1">
						<span
							className={`text-slate-900 ${unread ? "font-bold" : "font-semibold"}`}
						>
							{enquiry.name}
						</span>
						<span
							className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold ${kind.style}`}
						>
							<kind.icon size={12} /> {kind.label}
						</span>
						{enquiry.isDemo && (
							<span className="text-[10px] font-bold uppercase tracking-wider text-primary-700 bg-primary-50 px-1.5 py-0.5 rounded">
								Demo
							</span>
						)}
						{enquiry.status === "archived" && (
							<span className="text-xs font-semibold text-slate-500">
								Archived
							</span>
						)}
					</div>
					<p className="text-sm text-slate-500 truncate">
						{enquiry.listingTitle ?? enquiry.topic ?? "General enquiry"} ·{" "}
						{enquiry.message}
					</p>
				</div>
				<div className="flex items-center gap-2 shrink-0">
					<span className="text-xs text-slate-500 whitespace-nowrap">
						{formatRelative(enquiry._creationTime)}
					</span>
					<ChevronDown
						size={18}
						className={`text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
					/>
				</div>
			</button>

			{open && (
				<div className="px-4 sm:px-5 pb-5 sm:pl-11 animate-fade-in">
					<div className="grid sm:grid-cols-2 gap-3 text-sm mb-4">
						<a
							href={`mailto:${enquiry.email}`}
							className="flex items-center gap-2 text-slate-600 hover:text-primary-700"
						>
							<Mail size={16} className="text-slate-400" /> {enquiry.email}
						</a>
						{enquiry.phone && (
							<a
								href={telHref(enquiry.phone)}
								className="flex items-center gap-2 text-slate-600 hover:text-primary-700"
							>
								<Phone size={16} className="text-slate-400" /> {enquiry.phone}
							</a>
						)}
						{enquiry.listingTitle && (
							<span className="flex items-center gap-2 text-slate-600">
								<ExternalLink size={16} className="text-slate-400" />
								{enquiry.listingSlug ? (
									<Link
										to={`/property/${enquiry.listingSlug}`}
										target="_blank"
										className="hover:text-primary-700 underline"
									>
										{enquiry.listingTitle}
									</Link>
								) : (
									enquiry.listingTitle
								)}
							</span>
						)}
						{agent && (
							<span className="flex items-center gap-2 text-slate-600">
								<User size={16} className="text-slate-400" /> Agent:{" "}
								{agent.name}
							</span>
						)}
					</div>
					<p className="whitespace-pre-line text-slate-700 bg-white border border-slate-200 rounded-xl p-4 mb-4">
						{enquiry.message}
					</p>
					<p className="text-xs text-slate-500 mb-4">
						Received {formatDate(enquiry._creationTime)}
					</p>
					<div className="flex flex-wrap gap-2">
						<a
							href={`mailto:${enquiry.email}?subject=${encodeURIComponent(subject)}`}
							className="btn-primary py-2 text-sm"
						>
							<Reply size={16} /> Reply
						</a>
						{enquiry.status !== "new" && (
							<button
								type="button"
								className="btn-secondary py-2 text-sm"
								onClick={() => changeStatus("new", "Marked as unread")}
							>
								<MailOpen size={16} /> Mark unread
							</button>
						)}
						{enquiry.status === "archived" ? (
							<button
								type="button"
								className="btn-secondary py-2 text-sm"
								onClick={() => changeStatus("read", "Moved to inbox")}
							>
								<ArchiveRestore size={16} /> Unarchive
							</button>
						) : (
							<button
								type="button"
								className="btn-secondary py-2 text-sm"
								onClick={() => changeStatus("archived", "Archived")}
							>
								<Archive size={16} /> Archive
							</button>
						)}
						<button
							type="button"
							className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
							onClick={onDelete}
						>
							<Trash2 size={16} /> Delete
						</button>
					</div>
				</div>
			)}
		</li>
	);
};

const AdminEnquiries = () => {
	const enquiries = useQuery(api.enquiries.list);
	const remove = useMutation(api.enquiries.remove);
	const [tab, setTab] = useState<EnquiryStatus | "all">("new");
	const [openId, setOpenId] = useState<string | null>(null);
	const [toDelete, setToDelete] = useState<Enquiry | null>(null);

	const counts = useMemo(() => {
		const result: Record<string, number> = { all: enquiries?.length ?? 0 };
		for (const e of enquiries ?? [])
			result[e.status] = (result[e.status] ?? 0) + 1;
		return result;
	}, [enquiries]);

	if (enquiries === undefined) return <PageLoader />;

	const visible = enquiries.filter((e) => tab === "all" || e.status === tab);

	return (
		<div>
			<Seo title="Enquiries · Admin" />
			<PageHeader
				title="Enquiries"
				description="Messages from the contact form, tour requests and agent enquiries."
			/>

			<div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar">
				{TABS.map(({ value, label }) => (
					<button
						key={value}
						type="button"
						onClick={() => setTab(value)}
						aria-pressed={tab === value}
						className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${
							tab === value
								? "bg-slate-900 text-white"
								: "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
						}`}
					>
						{label}
						<CountPill count={counts[value] ?? 0} active={tab === value} />
					</button>
				))}
			</div>

			{visible.length === 0 ? (
				<div className="bg-white rounded-2xl border border-slate-200 text-center py-20 px-6">
					<Inbox size={40} className="mx-auto text-slate-300 mb-4" />
					<p className="text-slate-500">
						{tab === "new" ? "You're all caught up." : "Nothing here yet."}
					</p>
				</div>
			) : (
				<ul className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">
					{visible.map((enquiry) => (
						<EnquiryRow
							key={enquiry._id}
							enquiry={enquiry}
							open={openId === enquiry._id}
							onToggle={() =>
								setOpenId(openId === enquiry._id ? null : enquiry._id)
							}
							onDelete={() => setToDelete(enquiry)}
						/>
					))}
				</ul>
			)}

			<ConfirmDialog
				open={toDelete !== null}
				title="Delete enquiry?"
				description={`The message from ${toDelete?.name ?? ""} will be permanently deleted.`}
				onClose={() => setToDelete(null)}
				onConfirm={async () => {
					if (!toDelete) return;
					try {
						await remove({ id: toDelete._id });
						toast.success("Enquiry deleted");
					} catch (error) {
						toast.error(errorMessage(error));
					}
				}}
			/>
		</div>
	);
};

export default AdminEnquiries;
