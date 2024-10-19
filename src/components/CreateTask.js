import React, { useState } from "react";

function CreateTask({ createTask }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState(1);
  const [difficulty, setDifficulty] = useState("BAJO");
  const [duration, setDuration] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && desc && priority > 0 && duration) {
      // Create the task and include all the necessary fields
      createTask({
        nombreTarea: name,
        descTarea: desc,
        prioridadTarea: priority,
        dificultadTarea: difficulty,
        tiempoTarea: duration,
        finalizada: false,
      });

      // Reset the input fields after submission
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
        <input
          type="number"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          placeholder="Prioridad"
          min="1"
          max="5"
        />
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
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
        />
      </div>
      <button type="submit" className="new-task">
        Agregar nueva tarea
      </button>
    </form>
  );
}

export default CreateTask;