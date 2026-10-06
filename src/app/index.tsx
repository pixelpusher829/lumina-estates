import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";
import ErrorBoundary from "@/shared/components/ErrorBoundary";
import { FavoritesProvider } from "@/shared/hooks/useFavorites";
import { ThemeProvider, useTheme } from "@/shared/hooks/useTheme";
import App from "./App";
import "./global.css";

// Toasts follow the site theme.
const ThemedToaster = () => {
	const { resolved } = useTheme();
	return (
		<Toaster position="bottom-right" richColors closeButton theme={resolved} />
	);
};

/**
 * Shown instead of a blank page when the build has no backend URL, e.g. a
 * deploy that ran `vite build` instead of `convex deploy --cmd 'bun run build'`.
 */
const MissingConfig = () => (
	<div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
		<div className="max-w-md text-center">
			<h1 className="text-2xl font-bold text-slate-900 mb-3">
				Site not configured
			</h1>
			<p className="text-slate-500">
				This build has no backend URL (<code>VITE_CONVEX_URL</code>). Locally,
				run <code>bun run dev</code>. When deploying, build with{" "}
				<code>bunx convex deploy --cmd 'bun run build'</code> and set{" "}
				<code>CONVEX_DEPLOY_KEY</code>.
			</p>
		</div>
	</div>
);

const rootElement = document.getElementById("root");
if (!rootElement) {
	throw new Error("Could not find root element to mount to");
}

const convexUrl = import.meta.env.VITE_CONVEX_URL as string | undefined;
const root = ReactDOM.createRoot(rootElement);

if (!convexUrl) {
	console.error("VITE_CONVEX_URL is not set.");
	root.render(<MissingConfig />);
} else {
	const convex = new ConvexReactClient(convexUrl);
	root.render(
		<React.StrictMode>
			<ErrorBoundary>
				<ThemeProvider>
					<ConvexAuthProvider client={convex}>
						<BrowserRouter>
							<FavoritesProvider>
								<App />
								<ThemedToaster />
							</FavoritesProvider>
						</BrowserRouter>
					</ConvexAuthProvider>
				</ThemeProvider>
			</ErrorBoundary>
		</React.StrictMode>,
	);
}
