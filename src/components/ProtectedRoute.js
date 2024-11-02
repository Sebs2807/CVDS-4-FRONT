import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ roles, userRoles, userData, token, setToken }) {
	// Se verifica la coincidencia de alguno de los roles del usuario con los roles permitidos para que puedan acceder a esta ruta
    let hasPermission = false;
	for (let i = 0; i < roles.length; i++) {
		for (let j = 0; j < token.roles.length; j++) {
			if (roles[i] === token.roles[j]) {
				hasPermission = true;
			}
		}
	}

	// Si tiene permiso el usuario, usa el componente Outlet para permitir el acceso a la ruta protegida y pasar los parámetros como contexto a la ruta que tenía anidada
	if (hasPermission) {
		return (
			<Outlet context={{ userData, token, setToken }} />
		);
	} else {
		// Si no tiene permiso, renderiza el componente de no autorizado
		return <Navigate to="/not-authorized" replace />;
	}
}

export default ProtectedRoute;
