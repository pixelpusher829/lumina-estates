import { ChevronDown, ChevronUp } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { useSearchParams } from "react-router";

const FaqList: React.FC = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const query = (searchParams.get("q") ?? "").trim().toLowerCase();
	const [openIndex, setOpenIndex] = useState<number | null>(0);

	const faqs = [
		{
			question: "How do I schedule a viewing?",
			answer:
				"You can schedule a viewing directly from any property page by clicking the 'Request a Tour' button. Alternatively, you can contact the listing agent via phone or email form provided on the listing.",
		},
		{
			question: "Are the property prices negotiable?",
			answer:
				"Yes, most property prices are negotiable. Our agents are skilled negotiators and will work with you to submit a competitive offer that fits your budget and market conditions.",
		},
		{
			question: "What is the typical timeline for buying a home?",
			answer:
				"The timeline can vary, but generally takes 30-45 days from offer acceptance to closing. This includes time for inspections, financing approval, and title work.",
		},
		{
			question: "Do you offer property management services?",
			answer:
				"Yes, we offer full-service property management for investors. This includes tenant screening, rent collection, maintenance coordination, and financial reporting.",
		},
		{
			question: "How do I list my property with Lumina Estates?",
			answer:
				"To list your property, simply visit our 'Contact' page and select 'Selling a Property' as your topic. One of our senior agents will reach out to schedule a valuation and consultation.",
		},
		{
			question: "Is there a fee to use your website?",
			answer:
				"No, browsing properties and using our website tools is completely free for buyers and renters. Commission fees are typically paid by the seller upon a successful transaction.",
		},
	];

	const terms = query.split(/\s+/).filter(Boolean);
	const visible = faqs.filter((faq) =>
		terms.every((term) =>
			`${faq.question} ${faq.answer}`.toLowerCase().includes(term),
		),
	);

	const toggleFAQ = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<div className="space-y-4">
			{query && (
				<div className="flex items-center justify-between text-sm text-slate-500">
					<span>
						{visible.length} result{visible.length === 1 ? "" : "s"} for “
						{searchParams.get("q")}”
					</span>
					<button
						type="button"
						className="font-semibold text-primary-600 hover:underline"
						onClick={() => setSearchParams({}, { replace: true })}
					>
						Show all
					</button>
				</div>
			)}
			{visible.length === 0 && (
				<p className="text-center text-slate-500 py-10">
					No answers matched your search. Try different words, or contact us
					below.
				</p>
			)}
			{visible.map((faq, index) => (
				<div
					key={faq.question}
					className={`bg-white rounded-2xl border transition-all duration-300 ${
						openIndex === index
							? "border-primary-200 shadow-md ring-1 ring-primary-100"
							: "border-slate-100 shadow-sm hover:border-primary-100"
					}`}
				>
					<button
						className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
						onClick={() => toggleFAQ(index)}
						type="button"
					>
						<span
							className={`text-lg font-bold ${openIndex === index ? "text-primary-700" : "text-slate-800"}`}
						>
							{faq.question}
						</span>
						{openIndex === index ? (
							<ChevronUp className="text-primary-600" size={20} />
						) : (
							<ChevronDown className="text-slate-400" size={20} />
						)}
					</button>

					<div
						className={`overflow-hidden transition-all duration-300 ease-in-out ${
							openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
						}`}
					>
						<div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-transparent">
							{faq.answer}
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default FaqList;
