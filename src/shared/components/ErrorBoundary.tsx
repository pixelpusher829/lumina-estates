import { AlertTriangle } from "lucide-react";
import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
	children: ReactNode;
}

interface State {
	error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
	state: State = { error: null };

	static getDerivedStateFromError(error: Error): State {
		return { error };
	}

	componentDidCatch(error: Error, info: ErrorInfo) {
		console.error("Unhandled UI error", error, info.componentStack);
	}

	render() {
		if (!this.state.error) return this.props.children;
		return (
			<div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
				<div className="max-w-md text-center">
					<div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center">
						<AlertTriangle size={28} />
					</div>
					<h1 className="text-2xl font-bold text-slate-900 mb-2">
						Something went wrong
					</h1>
					<p className="text-slate-500 mb-8">
						An unexpected error occurred. Please reload the page and try again.
					</p>
					<button
						type="button"
						className="btn-primary"
						onClick={() => window.location.reload()}
					>
						Reload page
					</button>
				</div>
			</div>
		);
	}
}

export default ErrorBoundary;
