import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ roles, userRoles, userData, token, setToken }) {
    let hasPermission = false;
	for (let i = 0; i < roles.length; i++) {
		for (let j = 0; j < token.roles.length; j++) {
			if (roles[i] === token.roles[j]) {
				hasPermission = true;
			}
		}
	}

	if (hasPermission) {
		return (
			<Outlet context={{ userData, token, setToken }} /> // Pasa los datos si tiene permiso
		);
	} else {
		return <Navigate to="/not-authorized" replace />;
	}
}

export default ProtectedRoute;
