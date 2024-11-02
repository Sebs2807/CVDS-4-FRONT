import React from "react";

/**
 * Componente para mostrar un ítem de tarea.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {Object} props.task - La tarea a mostrar.
 * @param {Function} props.updateTask - Función para actualizar la tarea.
 * @param {Function} props.deleteTask - Función para eliminar la tarea.
 * @return {JSX.Element} El ítem de tarea.
 */
function TaskItem({ task, updateTask, deleteTask }) {
    /**
     * Maneja el cambio de estado de la tarea.
     */
    const handleToggleStatus = () => {
        const updatedTask = { ...task, finalizada: !task.finalizada };
        updateTask(updatedTask);
    };

    return (
        <li className="task-item">
            <h3
                className={
                    task.finalizada ? "estado-finalizada-t" : "estado-pendiente-t"
                }
            >
                {task.nombreTarea}
            </h3>
            <p className="subtitulo-tarea">
                <strong>Descripción:</strong> {task.descTarea}
            </p>
            <p className="subtitulo-tarea">
                <strong>Prioridad:</strong> {task.prioridadTarea}
            </p>
            <p className="subtitulo-tarea">
                <strong>Dificultad:</strong> {task.dificultadTarea}
            </p>
            <p className="subtitulo-tarea">
                <strong>Tiempo estimado:</strong> {task.tiempoTarea}
            </p>
            <p className={task.finalizada ? "estado-finalizada" : "estado-pendiente"}>
                <strong>Estado:</strong> {task.finalizada ? "Finalizada" : "Pendiente"}
            </p>
            <button className="cambiar-estado" onClick={handleToggleStatus}>
                Cambiar Estado
            </button>
            <button className="eliminar-tarea" onClick={() => deleteTask(task.idTarea)}>
                Eliminar
            </button>
        </li>
    );
}

export default TaskItem;