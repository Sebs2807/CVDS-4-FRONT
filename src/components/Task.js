import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import TaskManager from "./TaskManager";
import "../styles/Task.css";

function Tasks() {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]); // Define setTasks here
    
    const context = useOutletContext();
    const { userData } = context || {}; // Removed unused variables token and setToken
    console.log("Context data:", context); // Para verificar el contenido completo

    const handleLogout = async () => {
        try {
            console.log("tasks", tasks);
            const response = await fetch("https://localhost:8443/auth", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                navigate("/login");
            } else {
                console.error("Failed to log out");
            }
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const openAnalytics = async () => {
        try {
            const response = await fetch("https://localhost:8443/tasks/all", {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch tasks");
            }
            const allTasks = await response.json();
            navigate("/analytics", { state: { tasks: allTasks } });
        } catch (error) {
            console.error("Error fetching all tasks:", error);
        }
    };

    return (
        <div className="container">
            <div className="header">
                <h1 className="title">CRUD de Tareas CVDS</h1>
                <button className="logout-button" onClick={handleLogout}>
                    Logout
                </button>
            </div>
            <section className="members">
                <h2>Integrantes:</h2>
                <ul>
                    <li>David Felipe Velasquez Contreras</li>
                    <li>Santiago Diaz Rojas</li>
                    <li>Juan Sebastian Velasquez Rodriguez</li>
                    <li>Santiago Alberto Naranjo Abril</li>
                </ul>
                {userData.roles.includes("ROLE_ADMIN") && (
                    <div>
                        <button className="container1" onClick={openAnalytics}>
                            Ver Analítica de Tareas
                        </button>
                    </div>
                )}
            </section>
            <TaskManager token={userData} setTasks={setTasks} roles={userData.roles} /> {/* Pass setTasks here */}
        </div>
    );
}

export default Tasks;