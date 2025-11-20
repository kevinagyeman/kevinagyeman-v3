import { CopyIcon, SendIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const EmailCopy = ({ email }: { email: string }) => {
	const [copied, setCopied] = useState(false);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	const handleCopy = () => {
		navigator.clipboard.writeText(email);
		setCopied(true);
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		timeoutRef.current = setTimeout(() => setCopied(false), 1000);
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
			{copied && <p className="text-sm text-green-600 mt-4">Email copied!</p>}
		</>
	);
};

export default EmailCopy;
