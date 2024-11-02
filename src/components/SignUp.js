<<<<<<< Updated upstream
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
=======
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const apiUrl =
	"https://cvdslab5-fjecauhqhab6g6ad.eastus-01.azurewebsites.net/auth";
>>>>>>> Stashed changes

/**
 * Componente para manejar el registro de nuevos usuarios.
 *
 * @return {JSX.Element} El formulario de registro.
 */
function SignUp() {
<<<<<<< Updated upstream
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    /**
     * Maneja el envío del formulario de registro.
     *
     * @param {Event} e - El evento de envío del formulario.
     */
    const handleSignUp = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }
        try {
            const response = await fetch("https://localhost:8443/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userName: username, passwd: password }),
            });
            if (!response.ok) {
                throw new Error("Error en el registro");
            }
            alert("Registro exitoso");
            navigate("/login");
        } catch (error) {
            alert("Error en el registro. Por favor, intente nuevamente.");
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
=======
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const navigate = useNavigate();

	/**
	 * Maneja el evento de registrar una nueva cuenta, revisa que la contraseña y la confirmación de la misma coincidan, si la solicitud a la API es exitosa, redirige al usuario a la pestaña del Login
	 * @param {Event} e
	 */
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
>>>>>>> Stashed changes
}

export default SignUp;
