import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import {
	DEMO_LIMITS,
	LIMITS,
	LISTING_STATUSES,
	LISTING_TYPES,
	type ListingStatus,
	type ListingType,
	STATUS_LABELS,
} from "@convex/shared";
import { useMutation, useQuery } from "convex/react";
import {
	ArrowLeft,
	ExternalLink,
	Loader2,
	Lock,
	Save,
	Trash2,
} from "lucide-react";
import {
	type FormEvent,
	type ReactNode,
	useEffect,
	useRef,
	useState,
} from "react";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import PageLoader from "@/shared/components/PageLoader";
import Seo from "@/shared/components/Seo";
import { AGENTS } from "@/shared/data/agents";
import type { Listing } from "@/shared/types/types";
import { errorMessage } from "@/shared/utils/format";
import ConfirmDialog from "../components/ConfirmDialog";
import TagInput from "../components/TagInput";
import ImageUploader, { type Photo } from "./ImageUploader";

const AMENITY_SUGGESTIONS = [
	"Pool",
	"Garden",
	"Garage",
	"Balcony",
	"Air Conditioning",
	"Fireplace",
	"Smart Home",
	"Gym",
	"Concierge",
	"Waterfront",
	"View",
	"Pet Friendly",
	"Furnished",
	"Parking",
];

interface FormState {
	title: string;
	description: string;
	price: string;
	address: string;
	city: string;
	type: ListingType;
	status: ListingStatus;
	featured: boolean;
	beds: string;
	baths: string;
	sqft: string;
	tags: string[];
	highlights: string;
	agent: string;
}

type Errors = Partial<Record<keyof FormState | "photos", string>>;

function initialState(listing: Listing | null): FormState {
	return {
		title: listing?.title ?? "",
		description: listing?.description ?? "",
		price: listing ? String(listing.price) : "",
		address: listing?.address ?? "",
		city: listing?.city ?? "",
		type: listing?.type ?? "House",
		status: listing?.status ?? "draft",
		featured: listing?.featured ?? false,
		beds: listing ? String(listing.beds) : "",
		baths: listing ? String(listing.baths) : "",
		sqft: listing ? String(listing.sqft) : "",
		tags: listing?.tags ?? [],
		highlights: listing?.highlights.join("\n") ?? "",
		agent: listing?.agent ?? AGENTS[0].slug,
	};
}

function validate(form: FormState, photos: Photo[]): Errors {
	const errors: Errors = {};
	const isNumber = (value: string, min = 0) =>
		value.trim() !== "" &&
		Number.isFinite(Number(value)) &&
		Number(value) >= min;

	if (!form.title.trim()) errors.title = "Title is required.";
	if (!form.description.trim()) errors.description = "Description is required.";
	if (!form.address.trim()) errors.address = "Address is required.";
	if (!form.city.trim()) errors.city = "City is required.";
	if (!isNumber(form.price) || Number(form.price) <= 0)
		errors.price = "Enter a price.";
	if (!isNumber(form.beds) || !Number.isInteger(Number(form.beds))) {
		errors.beds = "Whole number.";
	}
	if (!isNumber(form.baths) || (Number(form.baths) * 2) % 1 !== 0) {
		errors.baths = "Steps of 0.5.";
	}
	if (!isNumber(form.sqft)) errors.sqft = "Enter the size.";
	if (form.status !== "draft" && photos.length === 0) {
		errors.photos = "Add at least one photo before publishing.";
	}
	return errors;
}

const Section = ({
	title,
	description,
	children,
}: {
	title: string;
	description?: string;
	children: ReactNode;
}) => (
	<section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6">
		<h2 className="font-bold text-slate-900">{title}</h2>
		{description && (
			<p className="text-sm text-slate-500 mt-0.5">{description}</p>
		)}
		<div className="mt-5 space-y-5">{children}</div>
	</section>
);

const FieldError = ({ message }: { message?: string }) =>
	message ? <p className="text-xs text-rose-600 mt-1.5">{message}</p> : null;

type EditableListing = Listing & { canEdit: boolean };

const ListingForm = ({ listing }: { listing: EditableListing | null }) => {
	const navigate = useNavigate();
	const viewer = useQuery(api.users.viewer);
	const readOnly = listing !== null && !listing.canEdit;
	const maxImages =
		viewer?.role === "demo" ? DEMO_LIMITS.imagesPerListing : LIMITS.images;
	const create = useMutation(api.listings.create);
	const update = useMutation(api.listings.update);
	const remove = useMutation(api.listings.remove);
	const discardUploads = useMutation(api.listings.discardUploads);

	const [form, setForm] = useState<FormState>(() => initialState(listing));
	const [photos, setPhotos] = useState<Photo[]>(
		() => listing?.photos.map((p, i) => ({ key: `existing-${i}`, ...p })) ?? [],
	);
	const [errors, setErrors] = useState<Errors>({});
	const [saving, setSaving] = useState(false);
	const [uploading, setUploading] = useState(false);
	const [dirty, setDirty] = useState(false);
	const [confirmDelete, setConfirmDelete] = useState(false);

	// Clean up photos uploaded in this session that never got saved.
	const sessionUploads = useRef<Id<"_storage">[]>([]);
	useEffect(() => {
		return () => {
			if (sessionUploads.current.length > 0) {
				void discardUploads({ storageIds: sessionUploads.current });
			}
		};
	}, [discardUploads]);

	// Warn before closing the tab with unsaved changes.
	useEffect(() => {
		if (!dirty) return;
		const onBeforeUnload = (e: BeforeUnloadEvent) => e.preventDefault();
		window.addEventListener("beforeunload", onBeforeUnload);
		return () => window.removeEventListener("beforeunload", onBeforeUnload);
	}, [dirty]);

	const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
		setForm((prev) => ({ ...prev, [key]: value }));
		setDirty(true);
		if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const found = validate(form, photos);
		setErrors(found);
		if (Object.keys(found).length > 0) {
			toast.error("Please fix the highlighted fields.");
			const first = Object.keys(found)[0];
			document
				.querySelector(`[name="${first}"], [data-name="${first}"]`)
				?.scrollIntoView({ behavior: "smooth", block: "center" });
			return;
		}

		const args = {
			title: form.title,
			description: form.description,
			price: Number(form.price),
			address: form.address,
			city: form.city,
			type: form.type,
			status: form.status,
			featured: form.featured,
			beds: Number(form.beds),
			baths: Number(form.baths),
			sqft: Number(form.sqft),
			tags: form.tags,
			highlights: form.highlights.split("\n"),
			agent: form.agent,
			images: photos.map((p) => p.ref),
		};

		setSaving(true);
		try {
			if (listing) {
				await update({ id: listing._id, ...args });
				toast.success("Listing updated");
			} else {
				await create(args);
				toast.success(
					args.status === "draft" ? "Draft saved" : "Listing published",
				);
			}
			setDirty(false);
			navigate("/admin");
		} catch (error) {
			toast.error(errorMessage(error));
		} finally {
			setSaving(false);
		}
	};

	const inputClass = (key: keyof Errors) =>
		`input ${errors[key] ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20" : ""}`;

	return (
		<form onSubmit={handleSubmit} noValidate>
			<Seo title={`${listing ? "Edit" : "New"} listing · Admin`} />
			<div className="flex items-center justify-between gap-4 mb-8">
				<div className="min-w-0">
					<Link
						to="/admin"
						className="inline-flex items-center gap-1.5 py-1 text-sm text-slate-500 hover:text-slate-900 mb-1"
					>
						<ArrowLeft size={16} /> All listings
					</Link>
					<h1 className="text-2xl sm:text-3xl font-bold text-slate-900 truncate">
						{listing ? listing.title : "New listing"}
					</h1>
					{readOnly && (
						<p className="mt-3 inline-flex items-start gap-2 text-sm text-slate-600 bg-slate-100 rounded-xl px-3 py-2">
							<Lock size={16} className="shrink-0 mt-0.5" />
							Sample listings are read-only in the demo.{" "}
							<Link
								to="/admin/listings/new"
								className="font-semibold text-primary-700 underline"
							>
								Create your own
							</Link>{" "}
							to try editing.
						</p>
					)}
				</div>
				{listing && (
					<Link
						to={`/property/${listing.slug}`}
						target="_blank"
						className="btn-secondary shrink-0 hidden sm:inline-flex"
					>
						<ExternalLink size={16} /> View
					</Link>
				)}
			</div>

			<fieldset
				disabled={readOnly}
				className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start min-w-0"
			>
				<div className="xl:col-span-2 space-y-6">
					<Section title="Basics">
						<div>
							<label className="label" htmlFor="title">
								Title
							</label>
							<input
								id="title"
								name="title"
								className={inputClass("title")}
								value={form.title}
								onChange={(e) => set("title", e.target.value)}
								maxLength={LIMITS.title}
								placeholder="e.g. Sunlit Garden Townhouse"
							/>
							<FieldError message={errors.title} />
						</div>
						<div>
							<label className="label" htmlFor="description">
								Description
							</label>
							<textarea
								id="description"
								name="description"
								rows={6}
								className={`${inputClass("description")} resize-y`}
								value={form.description}
								onChange={(e) => set("description", e.target.value)}
								maxLength={LIMITS.description}
								placeholder="Describe the property, its best features and the neighbourhood…"
							/>
							<div className="flex justify-between">
								<FieldError message={errors.description} />
								<span className="text-xs text-slate-500 mt-1.5 ml-auto">
									{form.description.length}/{LIMITS.description}
								</span>
							</div>
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
							<div>
								<label className="label" htmlFor="type">
									Property type
								</label>
								<select
									id="type"
									name="type"
									className="input"
									value={form.type}
									onChange={(e) => set("type", e.target.value as ListingType)}
								>
									{LISTING_TYPES.map((type) => (
										<option key={type}>{type}</option>
									))}
								</select>
							</div>
							<div>
								<label className="label" htmlFor="price">
									{form.status === "for_rent"
										? "Monthly rent (USD)"
										: "Price (USD)"}
								</label>
								<div className="relative">
									<span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
										$
									</span>
									<input
										id="price"
										name="price"
										type="number"
										inputMode="numeric"
										min={0}
										step={1}
										className={`${inputClass("price")} pl-8`}
										value={form.price}
										onChange={(e) => set("price", e.target.value)}
										placeholder="1250000"
									/>
								</div>
								<FieldError message={errors.price} />
							</div>
						</div>
					</Section>

					<Section title="Details">
						<div className="grid grid-cols-3 gap-3 sm:gap-5">
							{(
								[
									["beds", "Bedrooms", 1],
									["baths", "Bathrooms", 0.5],
									["sqft", "Size (sqft)", 1],
								] as const
							).map(([key, label, step]) => (
								<div key={key}>
									<label className="label" htmlFor={key}>
										{label}
									</label>
									<input
										id={key}
										name={key}
										type="number"
										inputMode="decimal"
										min={0}
										step={step}
										className={inputClass(key)}
										value={form[key]}
										onChange={(e) => set(key, e.target.value)}
									/>
									<FieldError message={errors[key]} />
								</div>
							))}
						</div>
					</Section>

					<Section title="Location">
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
							<div>
								<label className="label" htmlFor="address">
									Street address
								</label>
								<input
									id="address"
									name="address"
									className={inputClass("address")}
									value={form.address}
									onChange={(e) => set("address", e.target.value)}
									maxLength={LIMITS.address}
									placeholder="88 Forest Lane"
								/>
								<FieldError message={errors.address} />
							</div>
							<div>
								<label className="label" htmlFor="city">
									City
								</label>
								<input
									id="city"
									name="city"
									className={inputClass("city")}
									value={form.city}
									onChange={(e) => set("city", e.target.value)}
									maxLength={LIMITS.city}
									placeholder="Oakwood"
								/>
								<FieldError message={errors.city} />
							</div>
						</div>
					</Section>

					<Section
						title="Photos"
						description="The first photo is used as the cover image."
					>
						<div data-name="photos">
							<ImageUploader
								photos={photos}
								onChange={(updater) => {
									setPhotos(updater);
									setDirty(true);
									setErrors((prev) => ({ ...prev, photos: undefined }));
								}}
								onUploaded={(id) => sessionUploads.current.push(id)}
								onBusyChange={setUploading}
								maxImages={maxImages}
							/>
							<FieldError message={errors.photos} />
						</div>
					</Section>

					<Section title="Amenities & highlights">
						<div>
							<label className="label" htmlFor="tags">
								Amenities
							</label>
							<TagInput
								id="tags"
								values={form.tags}
								onChange={(tags) => set("tags", tags)}
								placeholder="Type and press Enter…"
								suggestions={AMENITY_SUGGESTIONS}
								maxItems={LIMITS.tags}
								maxLength={LIMITS.tag}
							/>
						</div>
						<div>
							<label className="label" htmlFor="highlights">
								Highlights{" "}
								<span className="font-normal text-slate-500">
									(one per line, optional)
								</span>
							</label>
							<textarea
								id="highlights"
								name="highlights"
								rows={4}
								className="input resize-y"
								value={form.highlights}
								onChange={(e) => set("highlights", e.target.value)}
								placeholder={
									"Walking distance to top-rated schools\nRecently renovated kitchen"
								}
							/>
						</div>
					</Section>
				</div>

				{/* Publish panel */}
				<aside
					aria-label="Publishing options"
					className="space-y-6 xl:sticky xl:top-10"
				>
					<Section title="Publishing">
						<div>
							<label className="label" htmlFor="status">
								Status
							</label>
							<select
								id="status"
								name="status"
								className="input"
								value={form.status}
								onChange={(e) => set("status", e.target.value as ListingStatus)}
							>
								{LISTING_STATUSES.map((status) => (
									<option key={status} value={status}>
										{STATUS_LABELS[status]}
									</option>
								))}
							</select>
							<p className="text-xs text-slate-500 mt-1.5">
								Drafts are hidden from the public site.
							</p>
						</div>
						<label className="flex items-start gap-3 cursor-pointer">
							<input
								type="checkbox"
								className="mt-1 w-4 h-4 accent-primary-600"
								checked={form.featured}
								onChange={(e) => set("featured", e.target.checked)}
							/>
							<span>
								<span className="block text-sm font-semibold text-slate-700">
									Feature on homepage
								</span>
								<span className="block text-xs text-slate-500">
									Shown in “Discover Your Perfect Home”.
								</span>
							</span>
						</label>
						<div>
							<label className="label" htmlFor="agent">
								Listing agent
							</label>
							<select
								id="agent"
								name="agent"
								className="input"
								value={form.agent}
								onChange={(e) => set("agent", e.target.value)}
							>
								{AGENTS.map((agent) => (
									<option key={agent.slug} value={agent.slug}>
										{agent.name}
									</option>
								))}
							</select>
						</div>

						{!readOnly && (
							<button
								type="submit"
								className="btn-primary w-full"
								disabled={saving || uploading}
							>
								{saving ? (
									<Loader2 size={18} className="animate-spin" />
								) : (
									<Save size={18} />
								)}
								{uploading
									? "Uploading photos…"
									: listing
										? "Save changes"
										: form.status === "draft"
											? "Save draft"
											: "Publish listing"}
							</button>
						)}
						{listing && !readOnly && (
							<button
								type="button"
								onClick={() => setConfirmDelete(true)}
								className="w-full inline-flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
							>
								<Trash2 size={16} /> Delete listing
							</button>
						)}
					</Section>
				</aside>
			</fieldset>

			{listing && (
				<ConfirmDialog
					open={confirmDelete}
					title="Delete listing?"
					description={
						<>
							<strong>{listing.title}</strong> and all of its photos will be
							permanently deleted.
						</>
					}
					onClose={() => setConfirmDelete(false)}
					onConfirm={async () => {
						try {
							await remove({ id: listing._id });
							setDirty(false);
							toast.success("Listing deleted");
							navigate("/admin");
						} catch (error) {
							toast.error(errorMessage(error));
						}
					}}
				/>
			)}
		</form>
	);
};

const ListingEditor = () => {
	const { id } = useParams<{ id: string }>();
	const listing = useQuery(api.listings.adminGet, id ? { id } : "skip");

	if (id && listing === undefined) return <PageLoader />;

	if (id && listing === null) {
		return (
			<div className="text-center py-20">
				<h1 className="text-xl font-bold text-slate-900 mb-2">
					Listing not found
				</h1>
				<p className="text-slate-500 mb-6">It may have been deleted.</p>
				<Link to="/admin" className="btn-secondary">
					Back to listings
				</Link>
			</div>
		);
	}

	return <ListingForm key={id ?? "new"} listing={listing ?? null} />;
};

export default ListingEditor;
