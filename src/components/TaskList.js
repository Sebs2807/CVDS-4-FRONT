import React from "react";
import TaskItem from "./TaskItem.js";

function TaskList({ tasks, updateTask, deleteTask }) {
	console.log(tasks, "Tareas");
	return (
		<ul id="task-list">
			{tasks.map((task) => (
				<TaskItem
					key={task.idTarea}
					task={task}
					updateTask={updateTask}
					deleteTask={deleteTask}
				/>
			))}
		</ul>
	);
}

export default TaskList;