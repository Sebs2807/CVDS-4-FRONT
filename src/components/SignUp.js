import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Componente para manejar el registro de nuevos usuarios.
 *
 * @return {JSX.Element} El formulario de registro.
 */
function SignUp() {
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
}

export default SignUp;