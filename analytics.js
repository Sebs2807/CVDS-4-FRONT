const apiUrl = 'http://localhost:8080/tasks'; 

async function fetchTasks() {
    const response = await fetch(apiUrl);
    return await response.json();
}

async function initCharts() {
    const tasks = await fetchTasks();

    const difficultyData = {
        labels: ['BAJO', 'MEDIO', 'ALTO'],
        datasets: [{
            label: 'Cantidad de Tareas',
            data: [tasks.filter(t => t.dificultadTarea === 'BAJO').length, 
                   tasks.filter(t => t.dificultadTarea === 'MEDIO').length,
                   tasks.filter(t => t.dificultadTarea === 'ALTO').length],
            backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384']
        }]
    };

    const timeData = tasks.reduce((acc, task) => {
        const time = task.tiempoTarea ? parseInt(task.tiempoTarea.split("H")[0]) : 0;
        if (task.finalizada) acc.push(time);
        return acc;
    }, []);

    const priorityData = {
        labels: ['1', '2', '3', '4', '5'],
        datasets: [{
            label: 'Promedio de Tareas',
            data: [1, 2, 3, 4, 5].map(priority => tasks.filter(t => t.prioridadTarea === priority).length),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
        }]
    };

    const totalTimeData = tasks.filter(t => t.finalizada).reduce((sum, task) => {
        const time = task.tiempoTarea ? parseInt(task.tiempoTarea.split("H")[0]) : 0;
        return sum + time;
    }, 0);

    new Chart(document.getElementById('difficultyChart'), {
        type: 'bar',
        data: difficultyData
    });

    new Chart(document.getElementById('tasksByTimeChart'), {
        type: 'line',
        data: {
            labels: Array.from({ length: timeData.length }, (_, i) => `Tarea ${i + 1}`),
            datasets: [{
                label: 'Tiempo de Tareas Finalizadas (horas)',
                data: timeData,
                backgroundColor: '#FF6384',
                borderColor: '#FF6384',
                fill: false
            }]
        }
    });

    new Chart(document.getElementById('priorityAvgChart'), {
        type: 'bar',
        data: priorityData
    });

    new Chart(document.getElementById('totalTimeChart'), {
        type: 'doughnut',
        data: {
            labels: ['Tiempo Total'],
            datasets: [{
                data: [totalTimeData],
                backgroundColor: ['#36A2EB']
            }]
        }
    });
}

document.addEventListener('DOMContentLoaded', initCharts);
