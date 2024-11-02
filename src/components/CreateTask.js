import React, { useState } from 'react';

/**
 * Componente para crear una nueva tarea.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {Function} props.createTask - Función para crear una nueva tarea.
 * @return {JSX.Element} El formulario para crear una nueva tarea.
 */
function CreateTask({ createTask }) {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [priority, setPriority] = useState(1);
    const [difficulty, setDifficulty] = useState("BAJO");
    const [duration, setDuration] = useState("");

    /**
     * Maneja el envío del formulario.
     *
     * @param {Event} e - El evento de envío del formulario.
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && desc && priority && difficulty && duration) {
            createTask({
                nombreTarea: name,
                descTarea: desc,
                prioridadTarea: priority,
                dificultadTarea: difficulty,
                tiempoTarea: duration,
                finalizada: false,
            });

            // Restablecer los campos de entrada después del envío
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
        <form onSubmit={handleSubmit}>
            <div className="adicionar-tarea">
                <input
                    className="i1"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nombre de la tarea"
                />
                <input
                    className="i2"
                    type="text"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Descripción"
                />
            </div>
            <div className="adicionar-tarea">
                <select
                    className="i3"
                    value={priority}
                    onChange={(e) => setPriority(Number(e.target.value))}
                >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
                <select
                    className="i4"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                >
                    <option value="BAJO">Bajo</option>
                    <option value="MEDIO">Medio</option>
                    <option value="ALTO">Alto</option>
                </select>
                <input
                    className="i5"
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="Duración (horas)"
                />
            </div>
            <button type="submit">Adicionar Tarea</button>
        </form>
    );
}

export default CreateTask;