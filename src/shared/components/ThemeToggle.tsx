import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/shared/hooks/useTheme";

interface ThemeToggleProps {
	/** Use white icons when sitting over a photo (e.g. the home hero). */
	onImage?: boolean;
	className?: string;
}

const ThemeToggle = ({ onImage = false, className = "" }: ThemeToggleProps) => {
	const { resolved, toggle } = useTheme();
	const dark = resolved === "dark";

	return (
		<button
			type="button"
			onClick={toggle}
			aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
			title={dark ? "Light mode" : "Dark mode"}
			className={`relative w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
				onImage
					? "text-white/80 hover:text-white hover:bg-white/10"
					: "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
			} ${className}`}
		>
			<Sun
				size={20}
				className={`absolute transition-all duration-300 ${dark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"}`}
			/>
			<Moon
				size={20}
				className={`absolute transition-all duration-300 ${dark ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100"}`}
			/>
		</button>
	);
};

export default ThemeToggle;
