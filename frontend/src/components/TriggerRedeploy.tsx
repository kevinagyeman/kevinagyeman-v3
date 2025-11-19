import { Loader2 } from "lucide-react";
import { useState } from "react";
import { triggerRedeploy } from "@/services/vercel";
import { Button } from "./ui/button";

function TriggerRedeployButton() {
	const [isLoading, setIsLoading] = useState(false);
	const redeploy = async () => {
		setIsLoading(true);
		try {
			await triggerRedeploy();
		} catch (e) {
			console.error(e);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<Button onClick={redeploy} className="bg-yellow-500" disabled={isLoading}>
			{isLoading ? <Loader2 className="animate-spin" /> : "Redeploy"}
		</Button>
	);
}

export default TriggerRedeployButton;
