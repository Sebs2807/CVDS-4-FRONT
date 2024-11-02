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
}

export default LogIn;