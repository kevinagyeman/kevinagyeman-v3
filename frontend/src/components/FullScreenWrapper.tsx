import type React from "react";

function FullScreenWrapper({ children }: { children: React.ReactNode }) {
	return (
		<div
			className="flex items-center justify-center min-h-screen px-4"
			style={{ minHeight: "calc(100vh - 65px - 65px)" }}
		>
			<div className="w-full max-w-xs">{children}</div>
		</div>
	);
}

export default FullScreenWrapper;
