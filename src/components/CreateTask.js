import React, { useState } from "react";
import Modal from "react-modal";
import "../styles/Task.css";

Modal.setAppElement("#root");

function CreateTask({ createTask }) {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [priority, setPriority] = useState(1);
    const [difficulty, setDifficulty] = useState("BAJO");
    const [duration, setDuration] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && desc && priority > 0 && duration) {
            createTask({
                nombreTarea: name,
                descTarea: desc,
                prioridadTarea: priority,
                dificultadTarea: difficulty,
                tiempoTarea: duration,
                finalizada: false,
            });
            closeModal();
            setName("");
            setDesc("");
            setPriority(1);
            setDifficulty("BAJO");
            setDuration("");
        } else {
            alert("Por favor, complete todos los campos correctamente.");
        }
    };

    return (
        <div>
            <button onClick={openModal} className="pi pi-plus">Nueva Tarea</button>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Crear Tarea" className="modal">
                <h2>Crear Nueva Tarea</h2>
                <form onSubmit={handleSubmit} className="modal-form">
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
        </div>
    );
}

export default CreateTask;