import type React from "react";

const PrivacyPolicy: React.FC = () => {
	return (
		<>
			<section className="mb-8">
				<h2 className="text-3xl font-bold text-slate-900 mb-6">
					Privacy Policy
				</h2>
				<h3 className="text-xl font-bold text-slate-900 mb-4">
					1. Information We Collect
				</h3>
				<p className="text-slate-600 mb-4">
					We collect information you provide directly to us when you create an
					account, update your profile, use the interactive features of our
					Service, subscribe to our newsletter, request customer support, or
					otherwise communicate with us.
				</p>
				<ul className="list-disc pl-6 text-slate-600 space-y-2">
					<li>Name, email address, phone number, and postal address.</li>
					<li>Property preferences and search history.</li>
					<li>Communications with our agents and support team.</li>
				</ul>
			</section>

			<section className="mb-8">
				<h3 className="text-xl font-bold text-slate-900 mb-4">
					2. How We Use Your Information
				</h3>
				<p className="text-slate-600 mb-4">
					We use the information we collect to provide, maintain, and improve
					our services, including to:
				</p>
				<ul className="list-disc pl-6 text-slate-600 space-y-2">
					<li>Process transactions and send related information.</li>
					<li>
						Send you technical notices, updates, security alerts, and support
						messages.
					</li>
					<li>Respond to your comments, questions, and requests.</li>
					<li>
						Communicate with you about products, services, offers, promotions,
						and events.
					</li>
				</ul>
			</section>

			<section className="mb-8">
				<h3 className="text-xl font-bold text-slate-900 mb-4">
					3. Data Security
				</h3>
				<p className="text-slate-600 mb-4">
					We take reasonable measures to help protect information about you from
					loss, theft, misuse and unauthorized access, disclosure, alteration
					and destruction. However, no internet transmission is completely
					secure.
				</p>
			</section>

			<section className="mb-8">
				<h3 className="text-xl font-bold text-slate-900 mb-4">4. Contact Us</h3>
				<p className="text-slate-600 mb-4">
					If you have any questions about this Privacy Policy, please contact us
					at:{" "}
					<a
						href="mailto:privacy@luminaestates.com"
						className="text-primary-600 underline underline-offset-2"
					>
						privacy@luminaestates.com
					</a>
				</p>
			</section>
		</>
	);
};

export default PrivacyPolicy;
