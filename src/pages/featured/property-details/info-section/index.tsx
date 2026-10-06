import type { Listing } from "@/shared/types/types";
import Header from "../Header";
import Amenities from "./Amenities";
import Description from "./Description";
import Highlights from "./Highlights";
import Stats from "./Stats";

interface InfoSectionProps {
	property: Listing;
}

const InfoSection = ({ property }: InfoSectionProps) => {
	return (
		<div className="lg:col-span-8 space-y-8">
			<Header property={property} />

			<div className="h-px bg-slate-100" />

			<Stats property={property} />

			<div className="h-px bg-slate-100" />

			<Description property={property} />

			<Amenities property={property} />

			<Highlights property={property} />
		</div>
	);
};

export default InfoSection;
