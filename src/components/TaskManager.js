import React, { useEffect, useState, useCallback } from "react";
import CreateTask from "./CreateTask";
import TaskList from "./TaskList";

const apiUrl = "https://localhost:8443/tasks";

/**
 * Componente para gestionar las tareas del usuario.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {Object} props.token - El token de autenticación del usuario.
 * @param {Function} props.setTasks - Función para establecer las tareas en el componente padre.
 * @return {JSX.Element} El componente de gestión de tareas.
 */
function TaskManager({ token, setTasks }) {
    const [tasks, localSetTasks] = useState([]);

    /**
     * Función para obtener las tareas del usuario desde el servidor.
     */
    const fetchTasks = useCallback(async () => {
        const response = await fetch(`${apiUrl}/GAT/${token.idUser}`);
        const data = await response.json();
        localSetTasks(data);
        setTasks(data); // Pasar las tareas al componente padre
    }, [token, setTasks]);

    /**
     * Efecto para obtener las tareas cuando el token cambia.
     */
    useEffect(() => {
        console.log("Token", token);
        if (token) {
            fetchTasks();
        }
    }, [token, fetchTasks]);

    /**
     * Función para crear una nueva tarea.
     *
     * @param {Object} newTask - La nueva tarea a crear.
     */
    const createTask = async (newTask) => {
        newTask.idUser = token.idUser;
        const response = await fetch(`${apiUrl}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTask),
        });
        if (response.ok) fetchTasks();
    };

    /**
     * Función para actualizar una tarea existente.
     *
     * @param {Object} task - La tarea a actualizar.
     */
    const updateTask = async (task) => {
        await fetch(`${apiUrl}/${task.idTarea}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
        });
        fetchTasks();
    };

    /**
     * Función para eliminar una tarea.
     *
     * @param {string} id - El ID de la tarea a eliminar.
     */
    const deleteTask = async (id) => {
        await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
        fetchTasks();
    };

    console.log(tasks, "tareas");
    return (
        <section className="task-manager">
            <h2>Administrador de Tareas</h2>
            <CreateTask createTask={createTask} /> {/* Pasar createTask aquí */}
            <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
        </section>
    );
}

export default TaskManager;