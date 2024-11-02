import React from "react";
import TaskItem from "./TaskItem.js"; // Importa el componente TaskItem que representa cada tarea individual

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
<<<<<<< Updated upstream
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
=======
        <div className="table-container"> {/* Contenedor de la tabla para un diseño estructurado */}
            <table id="task-list"> {/* Tabla para mostrar la lista de tareas */}
                <thead> {/* Encabezado de la tabla */}
                    <tr>
                        <th>Nombre</th> {/* Columna para el nombre de la tarea */}
                        <th>Descripción</th> {/* Columna para la descripción de la tarea */}
                        <th>Prioridad</th> {/* Columna para la prioridad de la tarea */}
                        <th>Dificultad</th> {/* Columna para la dificultad de la tarea */}
                        <th>Tiempo estimado</th> {/* Columna para la duración estimada */}
                        <th>Estado</th> {/* Columna para el estado de la tarea (finalizada o pendiente) */}
                        <th>Acciones</th> {/* Columna para las acciones (editar, eliminar, cambiar estado) */}
                    </tr>
                </thead>
                <tbody> {/* Cuerpo de la tabla donde se muestran las tareas */}
                    {tasks.map((task) => ( // Itera sobre la lista de tareas y renderiza un TaskItem para cada tarea
                        <TaskItem
                            key={task.idTarea} // Clave única para identificar cada elemento de la lista
                            task={task} // Pasa la tarea actual como propiedad al componente TaskItem
                            updateTask={updateTask} // Función para actualizar la tarea, se pasa como propiedad
                            deleteTask={deleteTask} // Función para eliminar la tarea, se pasa como propiedad
                        />
                    ))}
                </tbody>
            </table>
        </div>
>>>>>>> Stashed changes
    );
}

export default TaskList;
