import React from "react";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import "./analytics.css";
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

const analytics = ({ tasks }) => {
	const getTaskCountsByDifficulty = () => {
		return [
			tasks.filter((task) => task.dificultadTarea === "BAJO").length,
			tasks.filter((task) => task.dificultadTarea === "MEDIO").length,
			tasks.filter((task) => task.dificultadTarea === "ALTO").length,
		];
	};

	const getTimeData = () => {
		return tasks.reduce((acum, task) => {
			const time = task.tiempoTarea
				? parseInt(task.tiempoTarea.split("H")[0])
				: 0;
			if (task.finalizada) acum.push(time);
			return acum;
		}, []);
	};

	const getPriorityData = () => {
		return [1, 2, 3, 4, 5].map(
			(priority) =>
				tasks.filter((task) => task.prioridadTarea === priority).length
		);
	};

	const getTotalTimeData = () => {
		return tasks
			.filter((task) => task.finalizada)
			.reduce((sum, task) => {
				const time = task.tiempoTarea
					? parseInt(task.tiempoTarea.split("H")[0])
					: 0;
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
				<h2>Promedio de Tareas por Prioridad</h2>
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
				<Doughnut
					data={{
						labels: ["Tiempo Total"],
						datasets: [
							{
								data: [getTotalTimeData()],
								backgroundColor: ["#36A2EB"],
							},
						],
					}}
				/>
			</section>
		</div>
	);
};

export default analytics;
