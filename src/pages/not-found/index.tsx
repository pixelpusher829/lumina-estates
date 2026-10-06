import { Compass } from "lucide-react";
import { Link } from "react-router";
import Seo from "@/shared/components/Seo";

const NotFound = () => (
	<div className="min-h-[80vh] flex items-center justify-center pt-24 px-6">
		<Seo title="Page not found" />
		<div className="text-center max-w-md">
			<div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center">
				<Compass size={28} />
			</div>
			<p className="text-sm font-semibold text-primary-600 mb-2">404</p>
			<h1 className="text-3xl font-bold text-slate-900 mb-3">Page not found</h1>
			<p className="text-slate-500 mb-8">
				The page you're looking for doesn't exist or has moved.
			</p>
			<div className="flex flex-wrap gap-3 justify-center">
				<Link to="/" className="btn-primary">
					Go home
				</Link>
				<Link to="/featured" className="btn-secondary">
					Browse properties
				</Link>
			</div>
		</div>
	</div>
);

export default NotFound;
