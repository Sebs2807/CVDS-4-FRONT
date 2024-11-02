<<<<<<< Updated upstream
import React from "react";
=======
import React, { useState } from "react";
import Modal from "react-modal"; // Importa el componente Modal para crear ventanas modales
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Importa el componente para usar íconos
import { faCheck, faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons"; // Íconos específicos usados en este componente
import "../styles/Task.css"; // Importa los estilos CSS para las tareas

// Configura el elemento raíz para el Modal
Modal.setAppElement("#root");
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
    /**
     * Maneja el cambio de estado de la tarea.
     */
=======
    // Estados locales para manejar los datos de la tarea y el estado del Modal
    const [modalIsOpen, setModalIsOpen] = useState(false); // Controla la visibilidad del Modal
    const [name, setName] = useState(task.nombreTarea); // Estado para el nombre de la tarea
    const [desc, setDesc] = useState(task.descTarea); // Estado para la descripción de la tarea
    const [priority, setPriority] = useState(task.prioridadTarea); // Estado para la prioridad de la tarea
    const [difficulty, setDifficulty] = useState(task.dificultadTarea); // Estado para la dificultad de la tarea
    const [duration, setDuration] = useState(task.tiempoTarea); // Estado para la duración de la tarea

    // Funciones para abrir y cerrar el Modal
    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    // Maneja la actualización de la tarea
    const handleUpdate = (e) => {
        e.preventDefault(); // Evita que el formulario se envíe automáticamente
        updateTask({
            ...task,
            nombreTarea: name, // Actualiza el nombre de la tarea
            descTarea: desc, // Actualiza la descripción
            prioridadTarea: priority, // Actualiza la prioridad
            dificultadTarea: difficulty, // Actualiza la dificultad
            tiempoTarea: duration, // Actualiza la duración
        });
        closeModal(); // Cierra el Modal después de actualizar
    };

    // Cambia el estado de finalización de la tarea
>>>>>>> Stashed changes
    const handleToggleStatus = () => {
        const updatedTask = { ...task, finalizada: !task.finalizada }; // Invierte el estado de finalización
        updateTask(updatedTask); // Llama a la función de actualización con la tarea actualizada
    };

<<<<<<< Updated upstream
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
=======
    // Maneja la eliminación de la tarea con una confirmación de usuario
    const handleDelete = () => {
        if (window.confirm("¿Está seguro de que desea eliminar esta tarea?")) { // Muestra una ventana de confirmación
            deleteTask(task.idTarea); // Llama a la función de eliminación si el usuario confirma
        }
    };

    return (
        <tr>
            {/* Muestra los datos de la tarea en cada celda de la tabla */}
            <td>{task.nombreTarea}</td>
            <td>{task.descTarea}</td>
            <td>{task.prioridadTarea}</td>
            <td>{task.dificultadTarea}</td>
            <td>{task.tiempoTarea}</td>
            <td>{task.finalizada ? "Finalizada" : "Pendiente"}</td>
            <td>
                {/* Botón para cambiar el estado de finalización de la tarea */}
                <button onClick={handleToggleStatus} className="action-button green">
                    <FontAwesomeIcon icon={faCheck} /> {/* Ícono de verificación */}
                </button>
                {/* Botón para abrir el Modal de edición */}
                <button onClick={openModal} className="action-button yellow">
                    <FontAwesomeIcon icon={faPencilAlt} /> {/* Ícono de edición */}
                </button>
                {/* Botón para eliminar la tarea */}
                <button onClick={handleDelete} className="action-button red">
                    <FontAwesomeIcon icon={faTrash} /> {/* Ícono de eliminación */}
                </button>
            </td>
            {/* Modal para editar la tarea */}
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Editar Tarea" className="modal">
                <h2>Editar Tarea</h2>
                {/* Formulario para actualizar los detalles de la tarea */}
                <form onSubmit={handleUpdate} className="modal-form">
                    <div className="modal-inputs">
                        {/* Entrada para el nombre de la tarea */}
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nombre de la tarea"
                            className="modal-input"
                        />
                        {/* Entrada para la descripción de la tarea */}
                        <input
                            type="text"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            placeholder="Descripción"
                            className="modal-input"
                        />
                        {/* Entrada numérica para la prioridad (1-5) */}
                        <input
                            type="number"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            placeholder="Prioridad"
                            min="1"
                            max="5"
                            className="modal-input"
                        />
                        {/* Selección para la dificultad */}
                        <select
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                            className="modal-input"
                        >
                            <option value="BAJO">Bajo</option>
                            <option value="MEDIO">Medio</option>
                            <option value="ALTO">Alto</option>
                        </select>
                        {/* Entrada para la duración estimada */}
                        <input
                            type="text"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            placeholder="Tiempo estimado"
                            className="modal-input"
                        />
                    </div>
                    {/* Botones para cancelar o confirmar la actualización */}
                    <div className="modal-buttons">
                        <button type="button" onClick={closeModal} className="pi pi-times modal-button red">Cancelar</button>
                        <button type="submit" className="pi pi-check modal-button green">Confirmar</button>
                    </div>
                </form>
            </Modal>
        </tr>
>>>>>>> Stashed changes
    );
}

export default TaskItem;
