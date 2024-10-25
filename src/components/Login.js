import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const apiUrl = "http://localhost:8080/auth"; // Adjust this if necessary

function Login({ setToken, setUserData }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`${apiUrl}/${username}/${password}`);
			if (!response.ok) {
				throw new Error("Invalid login credentials");
			}
			const data = await response.json();
			console.log("Data", data);
			if (data && data.idUser) {
				setToken(data);
				setUserData(data); // Set the user data
				navigate("/tasks"); // Redirect to task manager
			} else {
				alert(
					"Hubo un problema con tus credenciales de inicio de sesión. Por favor, inténtalo de nuevo."
				);
			}
		} catch (error) {
			alert(error.message);
		}
	};

	return (
		<div className="auth-container">
			<div className="auth-form">
				<h1>Login</h1>
				<form onSubmit={handleLogin}>
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
					<button type="submit">Log In</button>
				</form>
				<p>
					No tienes una cuenta? <a href="/signup">Crear una</a>
				</p>
			</div>
		</div>
	);
}

export default Login;
