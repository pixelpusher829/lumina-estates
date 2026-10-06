import { api } from "@convex/_generated/api";
import {
	LISTING_STATUSES,
	type ListingStatus,
	STATUS_LABELS,
} from "@convex/shared";
import { useMutation, useQuery } from "convex/react";
import {
	Building2,
	ExternalLink,
	Eye,
	ImageOff,
	Lock,
	Pencil,
	Plus,
	Search,
	Star,
	Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import PageLoader from "@/shared/components/PageLoader";
import Seo from "@/shared/components/Seo";
import StatusBadge from "@/shared/components/StatusBadge";
import { getAgent } from "@/shared/data/agents";
import type { AdminListing } from "@/shared/types/types";
import {
	errorMessage,
	formatPrice,
	formatRelative,
} from "@/shared/utils/format";
import ConfirmDialog from "../components/ConfirmDialog";
import PageHeader from "../components/PageHeader";

const AdminListings = () => {
	const listings = useQuery(api.listings.adminList);
	const setStatus = useMutation(api.listings.setStatus);
	const toggleFeatured = useMutation(api.listings.toggleFeatured);
	const remove = useMutation(api.listings.remove);

	const [search, setSearch] = useState("");
	const [statusFilter, setStatusFilter] = useState<ListingStatus | "all">(
		"all",
	);
	const [toDelete, setToDelete] = useState<AdminListing | null>(null);

	const counts = useMemo(() => {
		const result: Record<string, number> = { all: listings?.length ?? 0 };
		for (const l of listings ?? [])
			result[l.status] = (result[l.status] ?? 0) + 1;
		return result;
	}, [listings]);

	const filtered = useMemo(() => {
		const term = search.trim().toLowerCase();
		return (listings ?? []).filter(
			(l) =>
				(statusFilter === "all" || l.status === statusFilter) &&
				(!term ||
					`${l.title} ${l.address} ${l.city}`.toLowerCase().includes(term)),
		);
	}, [listings, search, statusFilter]);

	if (listings === undefined) return <PageLoader />;

	const run = async (action: () => Promise<unknown>, success: string) => {
		try {
			await action();
			toast.success(success);
		} catch (error) {
			toast.error(errorMessage(error));
		}
	};

	return (
		<div>
			<Seo title="Listings · Admin" />
			<PageHeader
				title="Listings"
				description={`${counts.all} total · ${(counts.for_sale ?? 0) + (counts.for_rent ?? 0)} live`}
				actions={
					<Link to="/admin/listings/new" className="btn-primary">
						<Plus size={18} /> New listing
					</Link>
				}
			/>

			{/* Toolbar */}
			<div className="flex flex-col md:flex-row gap-3 mb-6">
				<div className="relative flex-1">
					<Search
						size={18}
						className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
					/>
					<input
						type="search"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Search listings…"
						aria-label="Search listings"
						className="input pl-10 bg-white"
					/>
				</div>
				<div className="flex gap-2 overflow-x-auto no-scrollbar">
					{(["all", ...LISTING_STATUSES] as const).map((status) => (
						<button
							key={status}
							type="button"
							onClick={() => setStatusFilter(status)}
							aria-pressed={statusFilter === status}
							className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${
								statusFilter === status
									? "bg-slate-900 text-white"
									: "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
							}`}
						>
							{status === "all" ? "All" : STATUS_LABELS[status]}{" "}
							<span className="opacity-60">{counts[status] ?? 0}</span>
						</button>
					))}
				</div>
			</div>

			{listings.length === 0 ? (
				<div className="bg-white rounded-2xl border border-slate-200 text-center py-20 px-6">
					<Building2 size={40} className="mx-auto text-slate-300 mb-4" />
					<h2 className="text-lg font-bold text-slate-900 mb-1">
						No listings yet
					</h2>
					<p className="text-slate-500 mb-6">
						Create your first listing to get started.
					</p>
					<Link to="/admin/listings/new" className="btn-primary">
						<Plus size={18} /> New listing
					</Link>
				</div>
			) : filtered.length === 0 ? (
				<p className="text-center text-slate-500 py-16">
					No listings match your filters.
				</p>
			) : (
				<ul className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">
					{filtered.map((listing) => (
						<li
							key={listing._id}
							className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 hover:bg-slate-50/60 transition-colors"
						>
							<Link
								to={`/admin/listings/${listing._id}/edit`}
								className="flex items-center gap-4 min-w-0 flex-1"
							>
								<div className="w-20 h-16 sm:w-24 sm:h-18 rounded-xl overflow-hidden bg-slate-100 shrink-0 flex items-center justify-center">
									{listing.coverUrl ? (
										<img
											src={listing.coverUrl}
											alt=""
											loading="lazy"
											className="w-full h-full object-cover"
										/>
									) : (
										<ImageOff size={20} className="text-slate-300" />
									)}
								</div>
								<div className="min-w-0">
									<p className="font-bold text-slate-900 truncate flex items-center gap-2">
										<span className="truncate">{listing.title}</span>
										{!listing.canEdit && (
											<span
												className="shrink-0 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded"
												title="Sample listings are read-only in the demo"
											>
												<Lock size={10} /> Sample
											</span>
										)}
										{listing.isDemo && (
											<span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-primary-700 bg-primary-50 px-1.5 py-0.5 rounded">
												Demo
											</span>
										)}
									</p>
									<p className="text-sm text-slate-500 truncate">
										{listing.address}, {listing.city}
									</p>
									<p className="text-xs text-slate-400 mt-1">
										{formatPrice(listing.price, listing.status)} ·{" "}
										{getAgent(listing.agent)?.name ?? "No agent"} · updated{" "}
										{formatRelative(listing.updatedAt)}
									</p>
								</div>
							</Link>

							<div className="flex items-center gap-2 sm:shrink-0">
								<div className="relative">
									<label htmlFor={`status-${listing._id}`} className="sr-only">
										Status
									</label>
									<select
										id={`status-${listing._id}`}
										value={listing.status}
										disabled={!listing.canEdit}
										onChange={(e) =>
											run(
												() =>
													setStatus({
														id: listing._id,
														status: e.target.value as ListingStatus,
													}),
												"Status updated",
											)
										}
										className="appearance-none cursor-pointer disabled:cursor-default opacity-0 absolute inset-0 w-full"
									>
										{LISTING_STATUSES.map((s) => (
											<option key={s} value={s}>
												{STATUS_LABELS[s]}
											</option>
										))}
									</select>
									<StatusBadge
										status={listing.status}
										className="pointer-events-none"
									/>
								</div>

								<div className="flex items-center ml-auto sm:ml-2">
									<button
										type="button"
										title={
											listing.featured
												? "Remove from homepage"
												: "Feature on homepage"
										}
										aria-pressed={listing.featured}
										disabled={!listing.canEdit}
										onClick={() =>
											run(
												() => toggleFeatured({ id: listing._id }),
												listing.featured
													? "Removed from homepage"
													: "Featured on homepage",
											)
										}
										className={`p-2 rounded-lg transition-colors disabled:pointer-events-none ${
											listing.featured
												? "text-amber-500 hover:bg-amber-50"
												: "text-slate-300 hover:text-amber-500 hover:bg-slate-100"
										}`}
									>
										<Star
											size={18}
											fill={listing.featured ? "currentColor" : "none"}
										/>
									</button>
									<Link
										to={`/property/${listing.slug}`}
										target="_blank"
										title="View on site"
										className="p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
									>
										<ExternalLink size={18} />
									</Link>
									<Link
										to={`/admin/listings/${listing._id}/edit`}
										title={listing.canEdit ? "Edit" : "View details"}
										className="p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
									>
										{listing.canEdit ? <Pencil size={18} /> : <Eye size={18} />}
									</Link>
									<button
										type="button"
										title={
											listing.canEdit
												? "Delete"
												: "Sample listings can't be deleted in the demo"
										}
										onClick={() => setToDelete(listing)}
										disabled={!listing.canEdit}
										className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors disabled:opacity-30 disabled:pointer-events-none"
									>
										<Trash2 size={18} />
									</button>
								</div>
							</div>
						</li>
					))}
				</ul>
			)}

			<ConfirmDialog
				open={toDelete !== null}
				title="Delete listing?"
				description={
					<>
						<strong>{toDelete?.title}</strong> and all of its photos will be
						permanently deleted. Consider marking it as <em>Sold</em> or{" "}
						<em>Draft</em> instead if you might need it again.
					</>
				}
				onClose={() => setToDelete(null)}
				onConfirm={async () => {
					if (!toDelete) return;
					await run(() => remove({ id: toDelete._id }), "Listing deleted");
				}}
			/>
		</div>
	);
};

export default AdminListings;
