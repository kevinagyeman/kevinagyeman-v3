import { CopyIcon, SendIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const EmailCopy = ({ email }: { email: string }) => {
	const [copied, setCopied] = useState(false);
	const [error, setError] = useState(false);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	const handleCopy = async () => {
		try {
			setError(false);
			await navigator.clipboard.writeText(email);
			setCopied(true);
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
			timeoutRef.current = setTimeout(() => setCopied(false), 1000);
		} catch (err) {
			setError(true);
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
			timeoutRef.current = setTimeout(() => setError(false), 3000);
		}
	};

	const sendEmail = () => {
		window.location.href = `mailto:${email}`;
	};

	return (
		<>
			<div className="flex gap-3 max-w-sm">
				<Input value={email} className="w-full" readOnly />
				<Button
					variant="outline"
					size="icon"
					onClick={handleCopy}
					aria-label="Copy email"
				>
					<CopyIcon />
				</Button>
				<Button
					size="icon"
					onClick={sendEmail}
					aria-label="Send email"
					variant={"outline"}
				>
					<SendIcon />
				</Button>
			</div>
			{copied && <p className="text-sm text-green-600 mt-2">Email copied!</p>}
			{error && (
				<p className="text-sm text-red-600 dark:text-red-400 mt-2">
					Failed to copy. Please try again or copy manually.
				</p>
			)}
		</>
	);
};

export default EmailCopy;
