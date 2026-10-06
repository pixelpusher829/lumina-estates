import EnquiryForm from "@/shared/components/EnquiryForm";

const TOPICS = [
	"Buying a Property",
	"Selling a Property",
	"Renting",
	"Property Management",
	"Other",
];

const ContactForm = () => {
	return (
		<div className="lg:col-span-2">
			<div className="bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-lg border border-slate-100">
				<h2 className="text-2xl font-bold text-slate-900 mb-8">
					Send us a Message
				</h2>
				<EnquiryForm kind="contact" topics={TOPICS} />
			</div>
		</div>
	);
};

export default ContactForm;
