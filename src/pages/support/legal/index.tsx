import type React from "react";
import Seo from "@/shared/components/Seo";
import LegalHeader from "./LegalHeader";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsOfService from "./TermsOfService";

const Legal: React.FC = () => {
	return (
		<div className="min-h-screen pt-28 pb-20 bg-white">
			<Seo
				title="Terms & Privacy"
				description="Terms of service and privacy policy."
			/>
			<div className="container mx-auto px-6 max-w-3xl">
				<LegalHeader />
				<div className="prose prose-slate lg:prose-lg">
					<TermsOfService />
					<PrivacyPolicy />
				</div>
			</div>
		</div>
	);
};

export default Legal;
