import React, { useState } from "react";

/**
 * Composant <TasksList />
 */
export function TasksList() {

	/**
	 * @type {Array<string>}
	 */
	const emptyTasks = [];
	// useState avec une valeur un objet
	const [tasks, setTasks] = useState(emptyTasks);

	const addTask = () => {
		setTasks((tasks) => ([...tasks, "Nouvelle tâche"]));
	};

	return (
		<div className="tasks-list">
			<h1>Tasks List</h1>

			<button type="button" onClick={addTask}>Ajouter une tâche</button>

			<ol>
				{tasks.map((task, idx) => (
					<li key={`${idx}_${task}`}>{task}</li>
				))}
			</ol>
		</div>
	);
}
