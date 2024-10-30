import React from "react";
import TaskItem from "./TaskItem.js";

function TaskList({ tasks, updateTask, deleteTask }) {
    return (
        <div className="table-container">
            <table id="task-list">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Prioridad</th>
                        <th>Dificultad</th>
                        <th>Tiempo estimado</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <TaskItem
                            key={task.idTarea}
                            task={task}
                            updateTask={updateTask}
                            deleteTask={deleteTask}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TaskList;