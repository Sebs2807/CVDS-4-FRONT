import React from 'react';
import { useLocation } from 'react-router-dom';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const Analytics = () => {
    const location = useLocation();
    const tasks = location.state?.tasks || [];

    /**
     * Obtiene el conteo de tareas por dificultad.
     *
     * @return {Array} Un arreglo con el conteo de tareas para cada nivel de dificultad (BAJO, MEDIO, ALTO).
     */
    const getTaskCountsByDifficulty = () => {
        return [
            tasks.filter((task) => task.dificultadTarea === "BAJO").length,
            tasks.filter((task) => task.dificultadTarea === "MEDIO").length,
            tasks.filter((task) => task.dificultadTarea === "ALTO").length,
        ];
    };

    /**
     * Obtiene los datos de tiempo de las tareas finalizadas.
     *
     * @return {Array} Un arreglo con los tiempos de las tareas finalizadas.
     */
    const getTimeData = () => {
        return tasks.reduce((acum, task) => {
            const time = task.tiempoTarea ? task.tiempoTarea : 0;
            if (task.finalizada) acum.push(time);
            return acum;
        }, []);
    };

    /**
     * Obtiene los datos de prioridad de las tareas.
     *
     * @return {Array} Un arreglo con el conteo de tareas para cada nivel de prioridad (1 a 5).
     */
    const getPriorityData = () => {
        return [1, 2, 3, 4, 5].map(
            (priority) =>
                tasks.filter((task) => task.prioridadTarea === priority).length
        );
    };

    /**
     * Obtiene el tiempo total de las tareas finalizadas.
     *
     * @return {number} El tiempo total de las tareas finalizadas.
     */
    const getTotalTimeData = () => {
        return tasks
            .filter((task) => task.finalizada)
            .reduce((sum, task) => {
                const time = task.tiempoTarea ? task.tiempoTarea : 0;
                return sum + time;
            }, 0);
    };

    return (
        <div className="container">
            <h1>Analítica de Tareas</h1>

            <section>
                <h2>Histograma de Dificultad</h2>
                <Bar
                    data={{
                        labels: ["BAJO", "MEDIO", "ALTO"],
                        datasets: [
                            {
                                label: "Cantidad de Tareas",
                                data: getTaskCountsByDifficulty(),
                                backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
                            },
                        ],
                    }}
                />
            </section>

            <section>
                <h2>Número de Tareas Finalizadas por Tiempo</h2>
                <Line
                    data={{
                        labels: Array.from(
                            { length: getTimeData().length },
                            (_, i) => `Tarea ${i + 1}`
                        ),
                        datasets: [
                            {
                                label: "Tiempo de Tareas Finalizadas (horas)",
                                data: getTimeData(),
                                backgroundColor: "#FF6384",
                                borderColor: "#FF6384",
                                fill: false,
                            },
                        ],
                    }}
                />
            </section>

            <section>
                <h2>Distribución de Prioridad de Tareas</h2>
                <Pie
                    data={{
                        labels: ["1", "2", "3", "4", "5"],
                        datasets: [
                            {
                                label: "Prioridad de Tareas",
                                data: getPriorityData(),
                                backgroundColor: [
                                    "#FF6384",
                                    "#36A2EB",
                                    "#FFCE56",
                                    "#4BC0C0",
                                    "#9966FF",
                                ],
                            },
                        ],
                    }}
                />
            </section>

            <section>
                <h2>Tiempo Total de Tareas Finalizadas</h2>
                <p>{`Tiempo total: ${getTotalTimeData()} horas`}</p>
            </section>
        </div>
    );
};

export default Analytics;