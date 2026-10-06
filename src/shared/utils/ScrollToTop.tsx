import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = () => {
	const { pathname } = useLocation();

	// biome-ignore lint/correctness/useExhaustiveDependencies: scroll on route change
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "instant" });
	}, [pathname]);

	return null;
};

export default ScrollToTop;
