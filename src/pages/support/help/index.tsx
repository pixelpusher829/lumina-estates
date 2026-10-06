import type React from "react";
import Seo from "@/shared/components/Seo";
import CategoriesGrid from "./CategoriesGrid";
import ContactCta from "./ContactCta";
import PopularArticles from "./PopularArticles";
import SearchHeader from "./SearchHeader";

const Help: React.FC = () => {
	return (
		<div className="min-h-screen pt-28 pb-20 bg-slate-50">
			<Seo
				title="Help Center"
				description="Guides and support for using Lumina Estates."
			/>
			<SearchHeader />

			<div className="container mx-auto px-6">
				<CategoriesGrid />
				<PopularArticles />
				<ContactCta />
			</div>
		</div>
	);
};

export default Help;
