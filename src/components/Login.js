import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Componente para manejar el inicio de sesión de los usuarios.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {Function} props.setToken - Función para establecer el token de autenticación.
 * @param {Function} props.setUserData - Función para establecer los datos del usuario.
 * @param {Function} props.setRoles - Función para establecer los roles del usuario.
 * @return {JSX.Element} El formulario de inicio de sesión.
 */
function LogIn({ setToken, setUserData, setRoles }) {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    /**
     * Maneja el envío del formulario de inicio de sesión.
     *
     * @param {Event} e - El evento de envío del formulario.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://localhost:8443/auth/${userName}/${password}`);
            if (!response.ok) {
                throw new Error("Error en la autenticación");
            }
            const data = await response.json();
            setToken(data.token);
            setUserData(data.user);
            setRoles(data.roles);
            navigate("/tasks");
        } catch (error) {
            alert("Error en la autenticación. Por favor, verifique sus credenciales.");
        }
    };

<<<<<<< Updated upstream
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Nombre de usuario:</label>
                <input
                    type="text"
                    id="username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Contraseña:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Iniciar Sesión</button>
        </form>
    );
=======
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
>>>>>>> Stashed changes
}

export default LogIn;