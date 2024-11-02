import React, { useEffect, useState, useCallback } from "react";
import CreateTask from "./CreateTask"; // Componente para crear nuevas tareas
import TaskList from "./TaskList"; // Componente para mostrar la lista de tareas

// URL de la API para las tareas
const apiUrl = "https://localhost:8443/tasks";

function TaskManager({ token, setTasks }) {
    // Estado local para manejar la lista de tareas
    const [tasks, localSetTasks] = useState([]);

    // Función para obtener las tareas del usuario de la API
    const fetchTasks = useCallback(async () => {
        const response = await fetch(`${apiUrl}/GAT/${token.idUser}`); // Llama a la API con el ID del usuario
        const data = await response.json(); // Convierte la respuesta en JSON
        localSetTasks(data); // Actualiza el estado local con las tareas obtenidas
        setTasks(data); // Pasa las tareas al componente padre
    }, [token, setTasks]); // Dependencias del useCallback: token y setTasks

    // useEffect para ejecutar fetchTasks cuando el componente se monta o cuando el token cambia
    useEffect(() => {
        console.log("Token", token); // Log para verificar el token
        if (token) {
            fetchTasks(); // Llama a fetchTasks si el token existe
        }
    }, [token, fetchTasks]); // Dependencias: token y fetchTasks

    // Función para crear una nueva tarea
    const createTask = async (newTask) => {
        newTask.idUser = token.idUser; // Asigna el ID del usuario al objeto de la nueva tarea
        const response = await fetch(`${apiUrl}`, {
            method: "POST", // Método POST para crear una nueva tarea
            headers: {
                "Content-Type": "application/json", // Cabecera indicando el tipo de contenido
            },
            body: JSON.stringify(newTask), // Convierte la tarea en JSON y la envía
        });
        if (response.ok) fetchTasks(); // Si la creación es exitosa, obtiene las tareas actualizadas
    };

    // Función para actualizar una tarea existente
    const updateTask = async (task) => {
        await fetch(`${apiUrl}/${task.idTarea}`, {
            method: "PUT", // Método PUT para actualizar la tarea
            headers: { "Content-Type": "application/json" }, // Cabecera indicando el tipo de contenido
            body: JSON.stringify(task), // Convierte la tarea actualizada en JSON y la envía
        });
        fetchTasks(); // Obtiene las tareas actualizadas después de la actualización
    };

    // Función para eliminar una tarea
    const deleteTask = async (id) => {
        await fetch(`${apiUrl}/${id}`, { method: "DELETE" }); // Método DELETE para eliminar la tarea
        fetchTasks(); // Obtiene las tareas actualizadas después de la eliminación
    };

    console.log(tasks, "tareas"); // Log para verificar las tareas

    return (
        <section className="task-manager">
            <h2>Administrador de Tareas</h2>
            <CreateTask createTask={createTask} /> {/* Componente para crear una nueva tarea, se le pasa createTask */}
            <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} /> {/* Lista de tareas, con funciones para actualizar y eliminar */}
        </section>
    );
}

export default TaskManager;
