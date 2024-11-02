import React from "react";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import { useLocation } from "react-router-dom";
import "../styles/Analytics.css";
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
} from "chart.js";

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

	if (!tasks || tasks.length === 0) {
		return <p>No hay tareas para mostrar en la analítica.</p>;
	}

	/**
	 * Obtiene la cantidad de tareas filtradas por dificultad, alto, medio o bajo
	 * @returns Lista con la cantidad de tareas por cada dificultad
	 */
	const getTaskCountsByDifficulty = () => {
		return [
			tasks.filter((task) => task.dificultadTarea === "BAJO").length,
			tasks.filter((task) => task.dificultadTarea === "MEDIO").length,
			tasks.filter((task) => task.dificultadTarea === "ALTO").length,
		];
	};

	/**
	 * Obtiene los tiempos de las tareas completadas.
	 * Recorre la lista de tareas y extrae los tiempos de aquellas tareas que están marcadas como finalizadas.
	 * @returns Lista con el tiempo invertido en cada tarea finalizada.
	 */
	const getTimeData = () => {
		return tasks.reduce((acum, task) => {
			const time = task.tiempoTarea ? task.tiempoTarea : 0;
			if (task.finalizada) acum.push(time);
			return acum;
		}, []);
	};

	/**
	 * Obtiene la cantidad de tareas filtradas por prioridad, genera un array con la cantidad de tareas para cada nivel de prioridad (del 1 al 5).
	 * @returns Lista con la cantidad de tareas en cada nivel de prioridad (1 a 5).
	 */
	const getPriorityData = () => {
		return [1, 2, 3, 4, 5].map(
			(priority) =>
				tasks.filter((task) => task.prioridadTarea === priority).length
		);
	};

	/**
	 * Calcula el tiempo total invertido en tareas completadas e incompletas, suma los tiempos de las tareas finalizadas e incompletas por separado.
	 * @returns Lista con dos elementos: [tiempo de tareas finalizadas, tiempo de tareas incompletas].
	 */
	const getTotalTimeData = () => {
		const completedTime = tasks
			.filter((task) => task.finalizada)
			.reduce((sum, task) => {
				const time = task.tiempoTarea ? task.tiempoTarea : 0;
				return sum + time;
			}, 0);

		const incompleteTime = tasks
			.filter((task) => !task.finalizada)
			.reduce((sum, task) => {
				const time = task.tiempoTarea ? task.tiempoTarea : 0;
				return sum + time;
			}, 0);

		return [completedTime, incompleteTime];
	};

	return (
		<div className="container">
			<h1>Analítica de Tareas</h1>

			<section>
				<h2>Histograma de Dificultad</h2>
				{/* Muestra un histograma con la cantidad de tareas por dificultad */}
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
				{/*Muestra el tiempo invertido en todas las tareas finalizadas*/}
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
				<h2>Promedio de Tareas por Prioridad</h2>
				{/* Muestra el promedio de tareas por prioridad */}
				<Bar
					data={{
						labels: ["1", "2", "3", "4", "5"],
						datasets: [
							{
								label: "Promedio de Tareas",
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
				<h2>Tiempo Total Invertido en Tareas</h2>
				{/* Muestra el tiempo total invertido diferenciando entre tareas completadas e incompletas*/}
				<Doughnut
					data={{
						labels: ["Tiempo Finalizado", "Tiempo Incompleto"],
						datasets: [
							{
								data: getTotalTimeData(),
								backgroundColor: ["#36A2EB", "#FF6384"],
							},
						],
					}}
				/>
			</section>
		</div>
	);
};

export default Analytics;
