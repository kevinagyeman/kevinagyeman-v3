import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { triggerRedeploy } from "@/services/vercel";
import { Button } from "./ui/button";

function TriggerRedeployButton() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string>("");
	const [success, setSuccess] = useState(false);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	const redeploy = async () => {
		setIsLoading(true);
		setError("");
		setSuccess(false);
		try {
			await triggerRedeploy();
			setSuccess(true);
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
			timeoutRef.current = setTimeout(() => setSuccess(false), 3000);
		} catch (e) {
			setError(e instanceof Error ? e.message : "Failed to trigger redeploy");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="space-y-2">
			<Button onClick={redeploy} className="bg-yellow-500" disabled={isLoading}>
				{isLoading ? <Loader2 className="animate-spin" /> : "Redeploy"}
			</Button>
			{error && (
				<p className="text-sm text-red-600 dark:text-red-400">{error}</p>
			)}
			{success && (
				<p className="text-sm text-green-600 dark:text-green-400">
					Redeployment triggered successfully!
				</p>
			)}
		</div>
	);
}

export default TriggerRedeployButton;
