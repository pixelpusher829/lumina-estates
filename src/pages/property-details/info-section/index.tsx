import React from "react";
import { Property } from "@/shared/types/types";
import Header from "../Header";
import Stats from "./Stats";
import Description from "./Description";
import Amenities from "./Amenities";
import Highlights from "./Highlights";

interface InfoSectionProps {
	property: Property;
}

const InfoSection: React.FC<InfoSectionProps> = ({ property }) => {
	return (
		<div className="lg:col-span-8 mb-8 space-y-8">
			<Header property={property} />

			<div className="h-px bg-slate-100"></div>

			<Stats property={property} />

			<div className="h-px bg-slate-100"></div>

			<Description property={property} />

			<Amenities property={property} />

			<div className="h-px bg-slate-100"></div>

			<Highlights property={property} />
		</div>
	);
};

export default InfoSection;
