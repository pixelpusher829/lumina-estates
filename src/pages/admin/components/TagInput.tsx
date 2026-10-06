import { Plus, X } from "lucide-react";
import { type KeyboardEvent, useState } from "react";

interface TagInputProps {
	id: string;
	values: string[];
	onChange: (values: string[]) => void;
	placeholder?: string;
	suggestions?: string[];
	maxItems: number;
	maxLength: number;
}

const TagInput = ({
	id,
	values,
	onChange,
	placeholder,
	suggestions = [],
	maxItems,
	maxLength,
}: TagInputProps) => {
	const [draft, setDraft] = useState("");

	const add = (raw: string) => {
		const value = raw.trim().slice(0, maxLength);
		if (!value || values.length >= maxItems) return;
		if (values.some((v) => v.toLowerCase() === value.toLowerCase())) return;
		onChange([...values, value]);
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" || e.key === ",") {
			e.preventDefault();
			add(draft);
			setDraft("");
		} else if (e.key === "Backspace" && !draft && values.length > 0) {
			onChange(values.slice(0, -1));
		}
	};

	const unused = suggestions.filter(
		(s) => !values.some((v) => v.toLowerCase() === s.toLowerCase()),
	);

	return (
		<div>
			<div className="flex flex-wrap gap-2 p-2 bg-slate-50 border border-slate-200 rounded-xl focus-within:ring-2 focus-within:ring-primary-500/20 focus-within:border-primary-500 focus-within:bg-white transition-all">
				{values.map((value) => (
					<span
						key={value}
						className="inline-flex items-center gap-1 pl-3 pr-1 py-1 rounded-lg bg-white border border-slate-200 text-sm font-medium text-slate-700"
					>
						{value}
						<button
							type="button"
							onClick={() => onChange(values.filter((v) => v !== value))}
							aria-label={`Remove ${value}`}
							className="p-0.5 rounded text-slate-400 hover:text-rose-600"
						>
							<X size={14} />
						</button>
					</span>
				))}
				<input
					id={id}
					value={draft}
					onChange={(e) => setDraft(e.target.value)}
					onKeyDown={handleKeyDown}
					onBlur={() => {
						add(draft);
						setDraft("");
					}}
					placeholder={
						values.length >= maxItems ? "Limit reached" : placeholder
					}
					disabled={values.length >= maxItems}
					maxLength={maxLength}
					className="flex-1 min-w-32 px-2 py-1 bg-transparent outline-none text-sm"
				/>
			</div>
			{unused.length > 0 && values.length < maxItems && (
				<div className="flex flex-wrap gap-1.5 mt-2">
					{unused.slice(0, 10).map((s) => (
						<button
							key={s}
							type="button"
							onClick={() => add(s)}
							className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-500 border border-dashed border-slate-300 hover:border-primary-400 hover:text-primary-700 transition-colors"
						>
							<Plus size={12} /> {s}
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default TagInput;
