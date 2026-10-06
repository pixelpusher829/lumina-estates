import { useEffect, useRef, useState } from "react";

const DURATION_MS = 1400;

/**
 * Animates from 0 to `target` the first time the element scrolls into view.
 * Jumps straight to the target when the user prefers reduced motion.
 */
export function useCountUp<T extends Element>(target: number) {
	const ref = useRef<T>(null);
	const [value, setValue] = useState(0);
	const started = useRef(false);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		// Wait for real data before animating (0 usually means "still loading").
		if (target === 0) {
			setValue(0);
			return;
		}

		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setValue(target);
			return;
		}

		let frame = 0;
		const run = () => {
			const start = performance.now();
			const tick = (now: number) => {
				const progress = Math.min((now - start) / DURATION_MS, 1);
				// Ease-out cubic so the count settles gently.
				setValue(target * (1 - (1 - progress) ** 3));
				if (progress < 1) frame = requestAnimationFrame(tick);
			};
			frame = requestAnimationFrame(tick);
		};

		// If the target changes after the animation ran (live data), just update.
		if (started.current) {
			setValue(target);
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !started.current) {
					started.current = true;
					run();
					observer.disconnect();
				}
			},
			{ threshold: 0.4 },
		);
		observer.observe(element);

		return () => {
			observer.disconnect();
			cancelAnimationFrame(frame);
		};
	}, [target]);

	return { ref, value };
}
