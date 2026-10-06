import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

export type ThemePreference = "light" | "dark" | "system";

// Keep in sync with the inline script in index.html.
const STORAGE_KEY = "lumina_theme";
const DARK_QUERY = "(prefers-color-scheme: dark)";

interface ThemeContextValue {
	preference: ThemePreference;
	resolved: "light" | "dark";
	setPreference: (preference: ThemePreference) => void;
	toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readPreference(): ThemePreference {
	try {
		const saved = localStorage.getItem(STORAGE_KEY);
		return saved === "light" || saved === "dark" ? saved : "system";
	} catch {
		return "system";
	}
}

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [preference, setPreferenceState] =
		useState<ThemePreference>(readPreference);
	const [systemDark, setSystemDark] = useState(
		() => window.matchMedia(DARK_QUERY).matches,
	);

	// Follow OS changes while the preference is "system".
	useEffect(() => {
		const media = window.matchMedia(DARK_QUERY);
		const onChange = () => setSystemDark(media.matches);
		media.addEventListener("change", onChange);
		return () => media.removeEventListener("change", onChange);
	}, []);

	const resolved =
		preference === "system" ? (systemDark ? "dark" : "light") : preference;

	useEffect(() => {
		document.documentElement.classList.toggle("dark", resolved === "dark");
	}, [resolved]);

	const setPreference = useCallback((next: ThemePreference) => {
		setPreferenceState(next);
		try {
			if (next === "system") localStorage.removeItem(STORAGE_KEY);
			else localStorage.setItem(STORAGE_KEY, next);
		} catch {
			// Storage unavailable; the choice still applies for this visit.
		}
	}, []);

	const toggle = useCallback(
		() => setPreference(resolved === "dark" ? "light" : "dark"),
		[resolved, setPreference],
	);

	const value = useMemo(
		() => ({ preference, resolved, setPreference, toggle }),
		[preference, resolved, setPreference, toggle],
	);

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (!context) throw new Error("useTheme must be used inside ThemeProvider");
	return context;
}
