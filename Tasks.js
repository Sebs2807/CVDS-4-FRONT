const apiUrl = 'http://localhost:8080/tasks'; 

async function fetchTasks() {
    const response = await fetch(apiUrl);
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
            descTarea: task.descTarea
        }

        UpdateTask(task.idTarea, jsonAns);

        task.finalizada = !task.finalizada; 
        renderTaskList(tasks);
    }
    
    function eliminarTarea(task) {
        const index = tasks.indexOf(task);
        if (index > -1) {
            tasks.splice(index, 1);
            DeleteTask(task.idTarea) 
        }
        renderTaskList(tasks); 
    }
}


async function createBtnListener(){
    const addBtn = document.getElementById('add-btn');
    addBtn.addEventListener('click', async () => {
        const nameInput = document.getElementById('task-name');
        const descInput = document.getElementById('task-desc');

        const name = nameInput.value.trim(); 
        const desc = descInput.value.trim(); 

        if (name !== "" && desc !== "") { 
            const jsonAns = {
                nombreTarea: name,
                finalizada: false,
                descTarea: desc
            };
            try {
                await CreateTask(jsonAns); 
                await fetchTasks(); 
                nameInput.value = ''; 
                descInput.value = ''; 
            } catch (error) {
                console.error('Error al crear la tarea:', error);
            }
        } else {
            alert("Por favor, complete todos los campos.");
        }
    });
}

document.addEventListener('DOMContentLoaded', fetchTasks);
document.addEventListener('DOMContentLoaded', createBtnListener);
