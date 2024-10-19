import React, { useEffect, useState } from "react";
import CreateTask from "./CreateTask";
import TaskList from "./TaskList";
import Analytics from "./analytics";

const apiUrl = "http://cvdslab5-fjecauhqhab6g6ad.eastus-01.azurewebsites.net/tasks";

function TaskManager() {
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		fetchTasks();
	}, []);

	const fetchTasks = async () => {
		const response = await fetch(apiUrl);
		const data = await response.json();
		setTasks(data);
	};

	const createTask = async (newTask) => {
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

	return (
		<section className="task-manager">
			<h2>Administrador de Tareas</h2>
			<CreateTask createTask={createTask} />
			<TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
		</section>
	);
}

export default TaskManager;
