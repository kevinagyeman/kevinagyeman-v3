import { type ReactNode, useEffect, useState } from "react";
import { getUserInfo } from "@/services/auth";

interface AdminGuardProps {
	children: ReactNode;
}

const AuthGuard = ({ children }: AdminGuardProps) => {
	const [loading, setLoading] = useState(true);
	const [authenticated, setAuthenticated] = useState(false);

	useEffect(() => {
		const verify = async () => {
			try {
				await getUserInfo();
				setAuthenticated(true);
			} catch {
				setAuthenticated(false);
				window.location.href = "/login";
			} finally {
				setLoading(false);
			}
		};

		verify();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!authenticated) {
		return null;
	}

	return <>{children}</>;
};

export default AuthGuard;
