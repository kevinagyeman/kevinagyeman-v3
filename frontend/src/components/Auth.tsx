import { DASHBOARD_URL } from "@/constants";
import { type AuthSchema, authSchema } from "@/schemas/auth-schema";
import { login } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import CustomInput from "./form/CustomInput";
import { Button } from "./ui/button";
import ErrorAlert from "./ui/ErrorAlert";

export default function Auth() {
	const [error, setError] = useState<string>("");

	const form = useForm<AuthSchema>({
		resolver: zodResolver(authSchema),
	});

	
	const errors = form.formState.errors;

	const submitAuth: SubmitHandler<AuthSchema> = async (data) => {
		try {
			setError("");
			await login(data.username, data.password);
			window.location.href = DASHBOARD_URL;
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Login failed. Please try again.",
			);
		}
	};

	return (
		<form onSubmit={form.handleSubmit(submitAuth)} className="space-y-6">
			<ErrorAlert error={error} />
			<CustomInput
				labelText="Username"
				inputType="text"
				placeholder="Username"
				inputProps={form.register("username")}
				error={errors.username?.message}
			/>
			<CustomInput
				labelText="Password"
				inputType="password"
				placeholder="Password"
				inputProps={form.register("password")}
				error={errors.password?.message}
			/>
			<Button
				type="submit"
				className="w-full"
				disabled={form.formState.isSubmitting}
			>
				{form.formState.isSubmitting ? (
					<Loader2 className="animate-spin" />
				) : (
					"Login"
				)}
			</Button>
		</form>
	);
}
