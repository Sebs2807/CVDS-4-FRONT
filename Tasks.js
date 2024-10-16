// const apiUrl = 'http://cvdslab5-fjecauhqhab6g6ad.eastus-01.azurewebsites.net/tasks'; 
const apiUrl = 'http://localhost:8080/tasks'

async function fetchTasks() {
    const idUser = "671033ace7442b72dd8487eb"
    const response = await fetch(`${apiUrl}/GAT/${idUser}`, {
        method: 'GET', 
    });
    const tasks = await response.json();
    renderTaskList(tasks);
}

async function UpdateTask(idTarea, jsonAns) {
    const response = await fetch(`${apiUrl}/${idTarea}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonAns), 
    });
}

async function DeleteTask(idTarea) {
    const response = await fetch(`${apiUrl}/${idTarea}`, {
        method: 'DELETE', 
    });
}

async function CreateTask(jsonAns) {
    const response = await fetch(`${apiUrl}`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonAns), 
    });
}

function renderTaskList(tasks) {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.classList.add('task-item');

        const estadoClase = task.finalizada ? 'estado-finalizada' : 'estado-pendiente';
        const estadoTitulo = task.finalizada ? 'estado-finalizada-t' : 'estado-pendiente-t';

        li.innerHTML = `
            <h3 class="${estadoTitulo}">${task.nombreTarea}</h3>
            <p class="subtitulo-tarea"><strong>Descripción:</strong> ${task.descTarea}</p>
            <p class="subtitulo-tarea"><strong>Prioridad:</strong> ${task.prioridadTarea}</p>
            <p class="subtitulo-tarea"><strong>Dificultad:</strong> ${task.dificultadTarea}</p>
            <p class="subtitulo-tarea"><strong>Tiempo estimado:</strong> ${task.tiempoTarea}</p>
            <p class="${estadoClase}"><strong>Estado:</strong> ${task.finalizada ? 'Finalizada' : 'Pendiente'}</p>
            <button class="cambiar-estado">Cambiar Estado</button>
            <button class="eliminar-tarea">Eliminar</button>
        `;

        taskList.appendChild(li);

        const cambiarEstadoBtn = li.querySelector('.cambiar-estado');
        cambiarEstadoBtn.addEventListener('click', () => {
            cambiarEstado(task);
        });

        const eliminarBtn = li.querySelector('.eliminar-tarea');
        eliminarBtn.addEventListener('click', () => {
            eliminarTarea(task);
        });
    });

    function cambiarEstado(task) {
        const jsonAns = {
            nombreTarea: task.nombreTarea,
            finalizada: !task.finalizada,
            descTarea: task.descTarea,
            prioridadTarea: task.prioridadTarea,
            dificultadTarea: task.dificultadTarea,
            tiempoTarea: task.tiempoTarea,
            idUser: task.idUser
        };

        UpdateTask(task.idTarea, jsonAns);
        task.finalizada = !task.finalizada;
        renderTaskList(tasks);
    }

    function eliminarTarea(task) {
        const index = tasks.indexOf(task);
        if (index > -1) {
            tasks.splice(index, 1);
            DeleteTask(task.idTarea);
        }
        renderTaskList(tasks);
    }
}



async function createBtnListener() {
    const addBtn = document.getElementById('add-btn');
    addBtn.addEventListener('click', async () => {
        const nameInput = document.getElementById('task-name');
        const descInput = document.getElementById('task-desc');
        const priorityInput = document.getElementById('task-priority');
        const difficultyInput = document.getElementById('task-difficulty');
        const durationInput = document.getElementById('task-duration');

        const name = nameInput.value.trim(); 
        const desc = descInput.value.trim();
        const priority = parseInt(priorityInput.value);
        const difficulty = difficultyInput.value;
        const duration = durationInput.value;

        if (name !== "" && desc !== "" && priority > 0 && duration) {
            const jsonAns = {
                nombreTarea: name,
                finalizada: false,
                descTarea: desc,
                prioridadTarea: priority,
                dificultadTarea: difficulty,
                tiempoTarea: duration
            };
            try {
                await CreateTask(jsonAns);
                await fetchTasks();
                nameInput.value = '';
                descInput.value = '';
                priorityInput.value = '';
                difficultyInput.value = 'BAJO';
                durationInput.value = '';
            } catch (error) {
                console.error('Error al crear la tarea:', error);
            }
        } else {
            alert("Por favor, complete todos los campos correctamente.");
        }
    });
}

document.addEventListener('DOMContentLoaded', fetchTasks);
document.addEventListener('DOMContentLoaded', createBtnListener);
