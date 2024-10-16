import React from "react";
import TaskManager from "./TaskManager";
import "./Task.css";

function Tasks() {
	return (
		<div className="container">
			<h1 className="title">CRUD de Tareas CVDS Laboratorio 4</h1>
			<section className="members">
				<h2>Integrantes:</h2>
				<ul>
					<li>David Felipe Velasquez Contreras</li>
					<li>Santiago Diaz Rojas</li>
					<li>Juan Sebastian Velasquez Rodriguez</li>
					<li>Santiago Alberto Naranjo Abril</li>
				</ul>
				<div>
					<a className="container1" href="analytics.html">
						Ver Analítica de Tareas
					</a>
				</div>
			</section>
			<TaskManager />
		</div>
	);
}

export default Tasks;
