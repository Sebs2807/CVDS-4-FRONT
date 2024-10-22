import React from "react";
import { useNavigate } from "react-router-dom";
import TaskManager from "./TaskManager";
import "./Task.css";

function Tasks({ userData }) {
	const navigate = useNavigate();
	const [tasks, setTasks] = React.useState([]); // Mover estado de tareas aquí para pasarlo a Analytics

	const handleLogout = async () => {
		try {
			const response = await fetch("http://localhost:8080/auth", {
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

	const openAnalytics = () => {
		navigate("/analytics", { state: { tasks } });
	};

	return (
		<div className="container">
			<div className="header">
				<h1 className="title">CRUD de Tareas CVDS Laboratorio 4</h1>
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
				<div>
					<button className="container1" onClick={openAnalytics}>
						Ver Analítica de Tareas
					</button>
				</div>
			</section>
			<TaskManager token={userData} setTasks={setTasks} /> {/* Pasa setTasks aquí */}
		</div>
	);
}

export default Tasks;
