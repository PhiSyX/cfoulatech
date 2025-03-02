import "./UserCard.css";

import React, { useState } from "react";

/**
 * Composant <UserProfile />
 */
export function UserProfile() {
	// useState avec une valeur un objet
	const [info, setInfo] = useState(
		{
			name: "Mike",
			age: 24,
		}
	);

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
	// la fonction setInfo pour mettre à jour l'âge en incrémentant de 1.
	const incrementAge = () => {
		// NOTE: setInfo DOIT RETOURNER UN NOUVEL OBJET A CHAQUE FOIS
		setInfo((info) => {
			// NOTE: c'est à dire qu'on ne peut pas directement écrire cela
			//
			//info.age = info.age + 1;
			//return info;

			// NOTE: en faisant cela, nous créons un nouvel objet à partir
			// des valeurs l'ancien objet grâce à la syntaxe spread operator,
			// en ne modifiant uniquement la propriété âge.
			return { ...info, age: info.age + 1 };
		});
	};

	/**
	 * @param {React.ChangeEvent<HTMLInputElement>} evt
	 */
	const handleChange = (evt) => {
		setInfo((info) => ({
			...info,
			name: evt.target.value,
		}));
	};

	return (
		<div className="user-profile">
			<h1>User Profile</h1>

			{/* biome-ignore lint/a11y/useKeyWithClickEvents: chut */}
			<div onClick={applyInputNameMode}>
				<label htmlFor="name">Nom :</label>

				{inputMode === "editable.name" ? (
					<input
						id="name"
						type="text"
						value={info.name}
						onChange={handleChange}
						onBlur={removeInputMode}
					/>
				) : (
					info.name
				)}
			</div>

			<div>
				<label htmlFor="age">Age : {info.age}</label>

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
