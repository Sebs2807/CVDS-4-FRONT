import React from "react";
import TaskItem from "./TaskItem.js";
import Analytics from "./analytics";

function TaskList({ tasks, updateTask, deleteTask }) {
	<Analytics tasks={tasks} />
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
