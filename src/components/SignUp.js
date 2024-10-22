import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const apiUrl = "http://localhost:8080/auth";

function SignUp() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const navigate = useNavigate();

	const handleSignUp = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			alert("Las contraseñas no coinciden.");
			return;
		}

		try {
			const response = await fetch(apiUrl, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ userName: username, passwd: password }),
			});

			// Check if the response body is empty
			const text = await response.text();
			const data = text ? JSON.parse(text) : null;

			if (data) {
				navigate("/login");
			} else {
				alert(
					"Hubo un problema al crear tu cuenta. Por favor, inténtalo de nuevo."
				);
			}
		} catch (error) {
			console.error("Error during sign up:", error);
			alert("Hubo un error al crear tu cuenta. Por favor, inténtalo de nuevo.");
		}
	};

	return (
		<div className="auth-container">
			<div className="auth-form">
				<h1>Sign Up</h1>
				<form onSubmit={handleSignUp}>
					<input
						type="text"
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<input
						type="password"
						placeholder="Confirm Password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
					<button type="submit">Sign Up</button>
				</form>
				<p>
					Ya tienes una cuenta? <a href="/login">Iniciar sesión</a>
				</p>
			</div>
		</div>
	);
}

export default SignUp;
