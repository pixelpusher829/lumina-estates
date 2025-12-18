import React from "react";
import { Link } from "react-router";

const ContactCta: React.FC = () => {
	return (
		<div className="mt-20 text-center">
			<p className="text-slate-500 mb-4">Can't find what you're looking for?</p>
			<Link
				to="/contact"
				className="inline-block px-8 py-3 bg-white border border-slate-200 text-slate-900 font-bold rounded-xl hover:bg-slate-50 transition-colors">
				Contact Support
			</Link>
		</div>
	);
};

export default ContactCta;
