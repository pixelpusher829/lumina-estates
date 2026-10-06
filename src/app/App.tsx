import { lazy, Suspense } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router";
import {
	About,
	Contact,
	FAQ,
	Favorites,
	Featured,
	Help,
	Home,
	Legal,
	NotFound,
	PropertyDetails,
	Services,
} from "@/pages";
import PageLoader from "@/shared/components/PageLoader";
import Footer from "@/shared/layout/Footer";
import Navbar from "@/shared/layout/Navbar";
import ScrollToTop from "@/shared/utils/ScrollToTop";

// The admin area is only needed by staff, so keep it out of the public bundle.
const AdminLogin = lazy(() => import("@/pages/admin/AdminLogin"));
const AdminLayout = lazy(() => import("@/pages/admin/AdminLayout"));
const AdminListings = lazy(() => import("@/pages/admin/listings"));
const AdminListingEditor = lazy(
	() => import("@/pages/admin/listings/ListingEditor"),
);
const AdminEnquiries = lazy(() => import("@/pages/admin/enquiries"));
const AdminSubscribers = lazy(() => import("@/pages/admin/subscribers"));

const PublicLayout = () => (
	<div className="flex flex-col min-h-screen">
		<Navbar />
		<main className="grow">
			<Outlet />
		</main>
		<Footer />
	</div>
);

const App = () => {
	return (
		<>
			<ScrollToTop />
			<Suspense fallback={<PageLoader />}>
				<Routes>
					<Route element={<PublicLayout />}>
						<Route path="/" element={<Home />} />
						<Route path="/featured" element={<Featured />} />
						<Route path="/property/:slug" element={<PropertyDetails />} />
						<Route path="/favorites" element={<Favorites />} />
						<Route path="/services" element={<Services />} />
						<Route path="/contact" element={<Contact />} />
						<Route path="/about" element={<About />} />
						{/* Agents now live on the About page. */}
						<Route
							path="/agents"
							element={<Navigate to="/about#team" replace />}
						/>
						<Route path="/legal" element={<Legal />} />
						<Route path="/help" element={<Help />} />
						<Route path="/faq" element={<FAQ />} />
						<Route path="*" element={<NotFound />} />
					</Route>

					<Route path="/admin/login" element={<AdminLogin />} />
					<Route path="/admin" element={<AdminLayout />}>
						<Route index element={<AdminListings />} />
						<Route path="listings/new" element={<AdminListingEditor />} />
						<Route path="listings/:id/edit" element={<AdminListingEditor />} />
						<Route path="enquiries" element={<AdminEnquiries />} />
						<Route path="subscribers" element={<AdminSubscribers />} />
					</Route>
				</Routes>
			</Suspense>
		</>
	);
};

export default App;
