import React, { useEffect, useState, useCallback } from "react";
import CreateTask from "./CreateTask";
import TaskList from "./TaskList";

const apiUrl = "https://localhost:8443/tasks";

function TaskManager({ token, setTasks }) {
	const [tasks, localSetTasks] = useState([]);

	const fetchTasks = useCallback(async () => {
		const response = await fetch(`${apiUrl}/GAT/${token.idUser}`);
		const data = await response.json();
		localSetTasks(data);
		setTasks(data); // Pasar las tareas al componente padre
	}, [token, setTasks]);

	useEffect(() => {
		console.log("Token", token);
		if (token) {
			fetchTasks();
		}
	}, [token, fetchTasks]);


	const createTask = async (newTask) => {
		newTask.idUser = token.idUser;
		const response = await fetch(`${apiUrl}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newTask),
		});
		if (response.ok) fetchTasks();
	};

	const updateTask = async (task) => {
		await fetch(`${apiUrl}/${task.idTarea}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(task),
		});
		fetchTasks();
	};

	const deleteTask = async (id) => {
		await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
		fetchTasks();
	};

	console.log(tasks,"tareas")
	return (
		<section className="task-manager">
			<h2>Administrador de Tareas</h2>
			<CreateTask createTask={createTask} /> {/* Pass createTask here */}
			<TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
		</section>
	);
}

export default TaskManager;
