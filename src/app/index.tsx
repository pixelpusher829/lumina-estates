import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";
import ErrorBoundary from "@/shared/components/ErrorBoundary";
import { FavoritesProvider } from "@/shared/hooks/useFavorites";
import App from "./App";
import "./global.css";

const convexUrl = import.meta.env.VITE_CONVEX_URL as string | undefined;
if (!convexUrl) {
	throw new Error(
		"VITE_CONVEX_URL is not set. Run `bunx convex dev` to create .env.local.",
	);
}

const convex = new ConvexReactClient(convexUrl);

const rootElement = document.getElementById("root");
if (!rootElement) {
	throw new Error("Could not find root element to mount to");
}

ReactDOM.createRoot(rootElement).render(
	<React.StrictMode>
		<ErrorBoundary>
			<ConvexAuthProvider client={convex}>
				<BrowserRouter>
					<FavoritesProvider>
						<App />
						<Toaster position="bottom-right" richColors closeButton />
					</FavoritesProvider>
				</BrowserRouter>
			</ConvexAuthProvider>
		</ErrorBoundary>
	</React.StrictMode>,
);
