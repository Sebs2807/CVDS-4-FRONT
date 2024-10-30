import React, { useState } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../styles/Task.css";

Modal.setAppElement("#root");

function TaskItem({ task, updateTask, deleteTask }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [name, setName] = useState(task.nombreTarea);
    const [desc, setDesc] = useState(task.descTarea);
    const [priority, setPriority] = useState(task.prioridadTarea);
    const [difficulty, setDifficulty] = useState(task.dificultadTarea);
    const [duration, setDuration] = useState(task.tiempoTarea);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const handleUpdate = (e) => {
        e.preventDefault();
        updateTask({
            ...task,
            nombreTarea: name,
            descTarea: desc,
            prioridadTarea: priority,
            dificultadTarea: difficulty,
            tiempoTarea: duration,
        });
        closeModal();
    };

    const handleToggleStatus = () => {
        const updatedTask = { ...task, finalizada: !task.finalizada };
        updateTask(updatedTask);
    };

    const handleDelete = () => {
        if (window.confirm("¿Está seguro de que desea eliminar esta tarea?")) {
            deleteTask(task.idTarea);
        }
    };

    return (
        <tr>
            <td>{task.nombreTarea}</td>
            <td>{task.descTarea}</td>
            <td>{task.prioridadTarea}</td>
            <td>{task.dificultadTarea}</td>
            <td>{task.tiempoTarea}</td>
            <td>{task.finalizada ? "Finalizada" : "Pendiente"}</td>
            <td>
                <button onClick={handleToggleStatus} className="action-button green">
                    <FontAwesomeIcon icon={faCheck} />
                </button>
                <button onClick={openModal} className="action-button yellow">
                    <FontAwesomeIcon icon={faPencilAlt} />
                </button>
                <button onClick={handleDelete} className="action-button red">
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </td>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Editar Tarea" className="modal">
                <h2>Editar Tarea</h2>
                <form onSubmit={handleUpdate} className="modal-form">
                    <div className="modal-inputs">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nombre de la tarea"
                            className="modal-input"
                        />
                        <input
                            type="text"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            placeholder="Descripción"
                            className="modal-input"
                        />
                        <input
                            type="number"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            placeholder="Prioridad"
                            min="1"
                            max="5"
                            className="modal-input"
                        />
                        <select
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                            className="modal-input"
                        >
                            <option value="BAJO">Bajo</option>
                            <option value="MEDIO">Medio</option>
                            <option value="ALTO">Alto</option>
                        </select>
                        <input
                            type="text"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            placeholder="Tiempo estimado"
                            className="modal-input"
                        />
                    </div>
                    <div className="modal-buttons">
                        <button type="button" onClick={closeModal} className="pi pi-times modal-button red">Cancelar</button>
                        <button type="submit" className="pi pi-check modal-button green">Confirmar</button>
                    </div>
                </form>
            </Modal>
        </tr>
    );
}

export default TaskItem;