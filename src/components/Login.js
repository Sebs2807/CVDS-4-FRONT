import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const apiUrl = "https://localhost:8443/auth"; // Adjust this if necessary

function Login({ setToken, setUserData, setRoles }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	/**
	 * Maneja el evento de autenticación del usuario, realiza una solicitud al API encargado de la autenticación, enviándole el nombre de usuario y la contraseña, si la respuesta es exitosa, guarda el token y los datos del usuario
	 * @param {Event} e Evento del envío de formulario para autenticación del usuario
	 */
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
				setRoles(data.roles)
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
