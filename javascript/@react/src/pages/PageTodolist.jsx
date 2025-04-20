import React, { useState } from "react";

export default function PageTodolist()
{
	const [tasks, setTasks] = useState(["Première tâche", "Seconde tâche"]);

	const addTask = () => {
		let task = prompt("Nouvelle tâche")?.trim();

		if (!task || task.length === 0) {
			return;
		}

		setTasks((tasks) => [...tasks, task]);
	};

	return (
		<div className="tasks-list">
			<h1>Liste des tâches</h1>

			<button
				type="button"
				onClick={addTask}
			>
				Ajouter une tâche
			</button>

			<ol>
				{tasks.map((task, idx) => (
					<li key={`${idx}_${task}`}>{task}</li>
				))}
			</ol>
		</div>
	);
}
