// components/pages/LoginPage.tsx
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

const LoginPage = ({ onLogin }: { onLogin: () => void }) => {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			await api.post("/auth/login", { username, password });
			onLogin();
			navigate("/");
		} catch {
			setError("Invalid username or password");
		}
	};

	return (
		<form className="login" onSubmit={handleSubmit}>
			<h1>Login</h1>
			<input
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				placeholder="Username"
				autoComplete="username"
				autoFocus
			/>
			<input
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="Password"
				autoComplete="current-password"
			/>
			{error && <p className="login__error">{error}</p>}
			<button type="submit">Log in</button>
		</form>
	);
};

export default LoginPage;
