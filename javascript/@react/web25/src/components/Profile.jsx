import "./UserCard.css";

import React, { useState } from "react";

/**
 * Composant <Profile />
 */
export function Profile() {
	const [nom, setNom] = useState("Mike");
	const [age, setAge] = useState(10);

	const [inputMode, setInputMode] = useState("");

	// Fonction anonyme stockée dans une variable `applyInputNameMode` qui
	// change le mode de l'input avec la fonction `setInputMode`.
	const applyInputNameMode = () => {
		setInputMode("editable.name");
	};
	// Fonction anonyme stockée dans une variable `removeInputMode` qui change
	// le mode de l'input avec la fonction `setInputMode` pour du vide.
	const removeInputMode = () => {
		setInputMode("");
	};
	// Fonction anonyme stockée dans une variable `incrementAge` qui va utiliser
	// la fonction setAge pour mettre à jour l'âge en incrémentant de 1.
	const incrementAge = () => {
		setAge((age) => age + 1);
	};

	/**
	 * @param {React.ChangeEvent<HTMLInputElement>} evt
	 */
	const handleChange = (evt) => {
		setNom(evt.target.value);
	};

	return (
		<div className="profile">
			<h1>Profile</h1>

			{/* biome-ignore lint/a11y/useKeyWithClickEvents: chut */}
			<div onClick={applyInputNameMode}>
				<label htmlFor="name">Nom : </label>

				{inputMode === "editable.name" ? (
					<input
						id="name"
						type="text"
						value={nom}
						onChange={handleChange}
						onBlur={removeInputMode}
					/>
				) : (
					nom
				)}
			</div>

			<div>
				<label htmlFor="age">Age : {age}</label>

				<br />

				<button
					type="button"
					onClick={incrementAge}
				>
					Augmenter l'âge
				</button>
			</div>
		</div>
	);
}
