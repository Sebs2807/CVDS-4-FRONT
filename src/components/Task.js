import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import TaskManager from "./TaskManager";
import "../styles/Task.css";

function Tasks() {
    // Hook para la navegación programática a diferentes rutas
    const navigate = useNavigate();
    
    // Hook para manejar el estado de las tareas; 'tasks' es el estado actual, 'setTasks' es la función para actualizarlo
    const [tasks, setTasks] = useState([]);
    
    // Obtenemos datos del contexto compartido proporcionado por el componente padre
    const context = useOutletContext();
    const { userData } = context || {}; // Extraemos 'userData' del contexto o proporcionamos un objeto vacío como valor predeterminado
    console.log("Context data:", context); // Para verificar el contenido completo del contexto en la consola

    // Función para manejar el cierre de sesión
    const handleLogout = async () => {
        try {
            console.log("tasks", tasks); // Registro en la consola para depurar el estado de 'tasks'

            // Llamada a la API para cerrar sesión
            const response = await fetch("https://localhost:8443/auth", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData), // Enviamos 'userData' como cuerpo de la solicitud
            });

            // Si la respuesta es exitosa, redirigimos al usuario a la página de inicio de sesión
            if (response.ok) {
                navigate("/login");
            } else {
                console.error("Failed to log out"); // Error en caso de fallo
            }
        } catch (error) {
            console.error("Error logging out:", error); // Captura y muestra errores
        }
    };

    // Función para abrir la página de analítica de tareas
    const openAnalytics = async () => {
        try {
            // Llamada a la API para obtener todas las tareas
            const response = await fetch("https://localhost:8443/tasks/all", {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch tasks"); // Lanzamos un error si la solicitud no es exitosa
            }

            // Convertimos la respuesta en JSON y navegamos a la página de analítica con las tareas
            const allTasks = await response.json();
            navigate("/analytics", { state: { tasks: allTasks } });
        } catch (error) {
            console.error("Error fetching all tasks:", error); // Captura y muestra errores
        }
    };

    return (
        <div className="container">
            <div className="header">
                <h1 className="title">CRUD de Tareas CVDS</h1>
                {/* Botón para cerrar sesión */}
                <button className="logout-button" onClick={handleLogout}>
                    Logout
                </button>
            </div>

            <section className="members">
                <h2>Integrantes:</h2>
                {/* Lista de integrantes del proyecto */}
                <ul>
                    <li>David Felipe Velasquez Contreras</li>
                    <li>Santiago Diaz Rojas</li>
                    <li>Juan Sebastian Velasquez Rodriguez</li>
                    <li>Santiago Alberto Naranjo Abril</li>
                </ul>

                {/* Mostrar botón de analítica solo si el usuario tiene el rol de administrador */}
                {userData.roles.includes("ROLE_ADMIN") && (
                    <div>
                        <button className="container1" onClick={openAnalytics}>
                            Ver Analítica de Tareas
                        </button>
                    </div>
                )}
            </section>

            {/* Componente 'TaskManager' para manejar las tareas, pasamos el token y la función 'setTasks' */}
            <TaskManager token={userData} setTasks={setTasks} roles={userData.roles} />
        </div>
    );
}

export default Tasks;
