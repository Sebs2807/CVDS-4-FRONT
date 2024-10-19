import React, { useEffect, useState } from "react";
import CreateTask from "./CreateTask";
import TaskList from "./TaskList";

const apiUrl = "http://localhost:8080/tasks"; 

function TaskManager({ token }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    console.log("Token", token);
    if (token) {
      fetchTasks();
    }
  }, [token]);

  const fetchTasks = async () => {
    const response = await fetch(`${apiUrl}/GAT/${token.idUser}`);
    const data = await response.json();
    setTasks(data);
  };

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

  const updateTask = async (task) => {
    await fetch(`${apiUrl}/${task.idTarea}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    fetchTasks();
  };

  return (
    <section className="task-manager">
      <h2>Administrador de Tareas</h2>
      <CreateTask createTask={createTask} /> {/* Pass createTask here */}
      <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
    </section>
  );
}

export default TaskManager;