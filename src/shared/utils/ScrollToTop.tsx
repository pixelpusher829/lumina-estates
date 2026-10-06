import { useEffect } from "react";
import { useLocation } from "react-router";

/**
 * Scrolls to the top on route changes, or to the matching element when the
 * URL has a hash (e.g. /about#team).
 */
const ScrollToTop = () => {
	const { pathname, hash } = useLocation();

	// biome-ignore lint/correctness/useExhaustiveDependencies: run when the path or hash changes (not on query-string updates like filters)
	useEffect(() => {
		if (!hash) {
			window.scrollTo({ top: 0, behavior: "instant" });
			return;
		}
		// Wait a frame so the target section has rendered.
		const frame = requestAnimationFrame(() => {
			document
				.getElementById(decodeURIComponent(hash.slice(1)))
				?.scrollIntoView({ behavior: "smooth", block: "start" });
		});
		return () => cancelAnimationFrame(frame);
	}, [pathname, hash]);

	return null;
};

export default ScrollToTop;
