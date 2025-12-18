import React from "react";
import { Link } from "react-router";
import { ArrowLeft, Share2, Heart } from "lucide-react";

interface NavHeaderProps {
	propertyId: string;
	isFavorite: boolean;
	onToggleFavorite: (id: string) => void;
}

const NavHeader: React.FC<NavHeaderProps> = ({
	propertyId,
	isFavorite,
	onToggleFavorite,
}) => {
	return (
		<div className="flex items-center justify-between py-6">
			<Link
				to="/"
				className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-medium">
				<ArrowLeft size={20} />
				<span className="hidden sm:inline">Back to Listings</span>
				<span className="sm:hidden">Back</span>
			</Link>
			<div className="flex gap-3">
				<button className="p-2.5 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
					<Share2 size={18} />
				</button>
				<button
					onClick={() => onToggleFavorite(propertyId)}
					className={`p-2.5 rounded-full border transition-colors ${
						isFavorite
							? "bg-rose-50 border-rose-200 text-rose-500"
							: "bg-white border-slate-200 text-slate-600 hover:border-rose-200 hover:text-rose-500"
					}`}>
					<Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
				</button>
			</div>
		</div>
	);
};

export default NavHeader;
