import React from "react";
import TaskItem from "./TaskItem.js";

/**
 * Componente para mostrar una lista de tareas.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {Array} props.tasks - Las tareas a mostrar.
 * @param {Function} props.updateTask - Función para actualizar una tarea.
 * @param {Function} props.deleteTask - Función para eliminar una tarea.
 * @return {JSX.Element} La lista de tareas.
 */
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