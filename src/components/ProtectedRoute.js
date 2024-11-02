import React from "react";
import { Navigate, Outlet } from "react-router-dom";

/**
 * Componente para proteger rutas basadas en roles de usuario.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {Array} props.roles - Los roles requeridos para acceder a la ruta.
 * @param {Array} props.userRoles - Los roles del usuario actual.
 * @param {Object} props.userData - Los datos del usuario actual.
 * @param {string} props.token - El token de autenticación del usuario.
 * @param {Function} props.setToken - Función para establecer el token de autenticación.
 * @return {JSX.Element} El componente protegido o una redirección a la página de no autorizado.
 */
function ProtectedRoute({ roles, userRoles, userData, token, setToken }) {
	// Se verifica la coincidencia de alguno de los roles del usuario con los roles permitidos para que puedan acceder a esta ruta
    let hasPermission = false;

<<<<<<< Updated upstream
    // Verifica si el usuario tiene alguno de los roles requeridos
    for (let i = 0; i < roles.length; i++) {
        for (let j = 0; j < token.roles.length; j++) {
            if (roles[i] === token.roles[j]) {
                hasPermission = true;
            }
        }
    }

    // Si el usuario tiene permiso, renderiza el componente protegido
    if (hasPermission) {
        return (
            <Outlet context={{ userData, token, setToken }} /> // Pasa los datos si tiene permiso
        );
    } else {
        // Si el usuario no tiene permiso, redirige a la página de no autorizado
        return <Navigate to="/not-authorized" replace />;
    }
=======
	// Si tiene permiso el usuario, usa el componente Outlet para permitir el acceso a la ruta protegida y pasar los parámetros como contexto a la ruta que tenía anidada
	if (hasPermission) {
		return (
			<Outlet context={{ userData, token, setToken }} />
		);
	} else {
		// Si no tiene permiso, renderiza el componente de no autorizado
		return <Navigate to="/not-authorized" replace />;
	}
>>>>>>> Stashed changes
}

export default ProtectedRoute;