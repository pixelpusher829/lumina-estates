import type React from "react";

const ContactHeader: React.FC = () => {
	return (
		<div className="text-center max-w-2xl mx-auto mb-16">
			<h1 className="text-5xl font-bold text-slate-900 mb-4">Get in Touch</h1>
			<p className="text-slate-500 text-lg">
				Have questions about a property or need help with your search? Our team
				of experts is ready to assist you.
			</p>
		</div>
	);
};

export default ContactHeader;
