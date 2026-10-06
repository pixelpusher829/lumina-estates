import { ArrowLeft, Heart, Share2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { useFavorites } from "@/shared/hooks/useFavorites";
import type { Listing } from "@/shared/types/types";
import { shareLink } from "@/shared/utils/share";

interface NavHeaderProps {
	property: Listing;
}

const NavHeader = ({ property }: NavHeaderProps) => {
	const navigate = useNavigate();
	const location = useLocation();
	const { isFavorite, toggleFavorite } = useFavorites();
	const favorite = isFavorite(property._id);

	// Go back if we navigated here within the app, otherwise to the listings.
	const goBack = () => {
		if (location.key !== "default") navigate(-1);
		else navigate("/featured");
	};

	return (
		<div className="flex items-center justify-between py-6">
			<button
				type="button"
				onClick={goBack}
				className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-medium"
			>
				<ArrowLeft size={20} />
				<span className="hidden sm:inline">Back to listings</span>
				<span className="sm:hidden">Back</span>
			</button>
			<div className="flex gap-3">
				<button
					className="p-2.5 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
					type="button"
					aria-label="Share"
					title="Share"
					onClick={() => shareLink({ title: property.title })}
				>
					<Share2 size={18} />
				</button>
				<button
					onClick={() => toggleFavorite(property._id)}
					className={`p-2.5 rounded-full border transition-colors ${
						favorite
							? "bg-rose-50 border-rose-200 text-rose-500"
							: "bg-white border-slate-200 text-slate-600 hover:border-rose-200 hover:text-rose-500"
					}`}
					type="button"
					aria-pressed={favorite}
					title={favorite ? "Remove from saved" : "Save property"}
				>
					<Heart size={18} fill={favorite ? "currentColor" : "none"} />
				</button>
			</div>
		</div>
	);
};

export default NavHeader;
