import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

const STORAGE_KEY = "lumina_favorites";

interface FavoritesContextValue {
	favorites: string[];
	isFavorite: (id: string) => boolean;
	toggleFavorite: (id: string) => void;
	removeFavorites: (ids: string[]) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

function readFavorites(): string[] {
	try {
		const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
		return Array.isArray(parsed)
			? parsed.filter((id): id is string => typeof id === "string")
			: [];
	} catch {
		return [];
	}
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
	const [favorites, setFavorites] = useState<string[]>(readFavorites);

	useEffect(() => {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
		} catch {
			// Storage can be unavailable (private mode, quota); favourites stay in memory.
		}
	}, [favorites]);

	// Keep multiple tabs in sync.
	useEffect(() => {
		const onStorage = (e: StorageEvent) => {
			if (e.key === STORAGE_KEY) setFavorites(readFavorites());
		};
		window.addEventListener("storage", onStorage);
		return () => window.removeEventListener("storage", onStorage);
	}, []);

	const toggleFavorite = useCallback((id: string) => {
		setFavorites((prev) =>
			prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id],
		);
	}, []);

	const removeFavorites = useCallback((ids: string[]) => {
		setFavorites((prev) => prev.filter((fav) => !ids.includes(fav)));
	}, []);

	const value = useMemo(
		() => ({
			favorites,
			isFavorite: (id: string) => favorites.includes(id),
			toggleFavorite,
			removeFavorites,
		}),
		[favorites, toggleFavorite, removeFavorites],
	);

	return (
		<FavoritesContext.Provider value={value}>
			{children}
		</FavoritesContext.Provider>
	);
}

export function useFavorites() {
	const context = useContext(FavoritesContext);
	if (!context)
		throw new Error("useFavorites must be used inside FavoritesProvider");
	return context;
}
