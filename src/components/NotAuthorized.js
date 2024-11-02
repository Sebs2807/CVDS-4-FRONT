import React from 'react';

/**
 * Componente para mostrar un mensaje de acceso denegado.
 *
 * @return {JSX.Element} Un mensaje indicando que el usuario no tiene los permisos necesarios.
 */
function NotAuthorized() {
    return (
        <div>
            <h1>Acceso Denegado</h1>
            <p>No tienes los permisos necesarios para ver esta página.</p>
        </div>
    );
}

export default NotAuthorized;