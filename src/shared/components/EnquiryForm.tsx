import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import type { EnquiryKind } from "@convex/shared";
import { useMutation } from "convex/react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { type FormEvent, type ReactNode, useId, useState } from "react";
import { errorMessage } from "@/shared/utils/format";

interface EnquiryFormProps {
	kind: EnquiryKind;
	listingId?: Id<"listings">;
	defaultMessage?: string;
	topics?: string[];
	submitLabel?: string;
	successContent?: ReactNode;
}

const EnquiryForm = ({
	kind,
	listingId,
	defaultMessage = "",
	topics,
	submitLabel = "Send Message",
	successContent,
}: EnquiryFormProps) => {
	const submit = useMutation(api.enquiries.submit);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [sent, setSent] = useState(false);
	const formId = useId();
	const id = (name: string) => `${formId}-${name}`;

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;
		const data = new FormData(form);
		const field = (name: string) => String(data.get(name) ?? "");

		setSubmitting(true);
		setError(null);
		try {
			await submit({
				kind,
				listingId,
				name: `${field("firstName")} ${field("lastName")}`.trim(),
				email: field("email"),
				phone: field("phone") || undefined,
				topic: field("topic") || undefined,
				message: field("message"),
				website: field("website") || undefined,
			});
			form.reset();
			setSent(true);
		} catch (err) {
			setError(errorMessage(err));
		} finally {
			setSubmitting(false);
		}
	};

	if (sent) {
		return (
			<div className="text-center py-8" role="status">
				<div className="w-14 h-14 mx-auto mb-4 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
					<CheckCircle2 size={28} />
				</div>
				{successContent ?? (
					<>
						<h3 className="text-xl font-bold text-slate-900 mb-2">
							Message sent
						</h3>
						<p className="text-slate-500">
							Thanks for reaching out. We'll get back to you within one business
							day.
						</p>
					</>
				)}
				<button
					type="button"
					className="mt-6 text-sm font-semibold text-primary-600 hover:underline"
					onClick={() => setSent(false)}
				>
					Send another message
				</button>
			</div>
		);
	}

	return (
		<form className="space-y-5" onSubmit={handleSubmit}>
			{/* Honeypot field, hidden from people */}
			<div className="hidden" aria-hidden="true">
				<label htmlFor={id("website")}>Website</label>
				<input
					id={id("website")}
					name="website"
					tabIndex={-1}
					autoComplete="off"
				/>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
				<div>
					<label className="label" htmlFor={id("firstName")}>
						First name
					</label>
					<input
						id={id("firstName")}
						name="firstName"
						className="input"
						placeholder="John"
						autoComplete="given-name"
						required
						maxLength={50}
					/>
				</div>
				<div>
					<label className="label" htmlFor={id("lastName")}>
						Last name
					</label>
					<input
						id={id("lastName")}
						name="lastName"
						className="input"
						placeholder="Doe"
						autoComplete="family-name"
						maxLength={50}
					/>
				</div>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
				<div>
					<label className="label" htmlFor={id("email")}>
						Email address
					</label>
					<input
						id={id("email")}
						name="email"
						type="email"
						className="input"
						placeholder="john@example.com"
						autoComplete="email"
						required
						maxLength={200}
					/>
				</div>
				<div>
					<label className="label" htmlFor={id("phone")}>
						Phone <span className="font-normal text-slate-500">(optional)</span>
					</label>
					<input
						id={id("phone")}
						name="phone"
						type="tel"
						className="input"
						placeholder="+1 (555) 000-0000"
						autoComplete="tel"
						maxLength={40}
					/>
				</div>
			</div>

			{topics && (
				<div>
					<label className="label" htmlFor={id("topic")}>
						Topic
					</label>
					<select
						id={id("topic")}
						name="topic"
						className="input text-slate-700"
					>
						{topics.map((topic) => (
							<option key={topic}>{topic}</option>
						))}
					</select>
				</div>
			)}

			<div>
				<label className="label" htmlFor={id("message")}>
					Message
				</label>
				<textarea
					id={id("message")}
					name="message"
					rows={5}
					className="input resize-none"
					placeholder="How can we help you?"
					defaultValue={defaultMessage}
					required
					maxLength={4000}
				/>
			</div>

			{error && (
				<p
					className="text-sm text-rose-600 bg-rose-50 rounded-xl px-4 py-3"
					role="alert"
				>
					{error}
				</p>
			)}

			<button
				type="submit"
				disabled={submitting}
				className="btn-primary w-full py-4"
			>
				{submitting ? (
					<Loader2 size={20} className="animate-spin" />
				) : (
					<Send size={20} />
				)}
				{submitting ? "Sending…" : submitLabel}
			</button>
		</form>
	);
};

export default EnquiryForm;
