import "./UserCard.css";

import React, { useState } from "react";

/**
 * Composant <Profil />
 */
export function Profile() {
	const [nom, setNom] = useState("Mike");
	const [age, setAge] = useState(10);
	const [inputMode, setInputMode] = useState("");

	const changeInputNameMode = () => {
		setInputMode("input.name")
	};

	const incrementAge = () => {
		setAge(age + 1);
	};

	const handleChange = (evt) => {
		setNom(evt.target.value);
	};

	return (
		<div className="profile">
			<div>
				{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
				<label htmlFor="name" onClick={changeInputNameMode}>
					Nom :&nbsp;
				</label>

				{
				inputMode === 'input.name'
					? <input
							id="name"
							type="text"
							value={nom}
							onChange={handleChange}
							onBlur={() => setInputMode("")}
						/>
					: nom
				}
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
