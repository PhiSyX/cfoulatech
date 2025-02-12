import "./UserCard.css";

import React from "react";

/**
 * Composant <UserCard />
 *
 * @param {object} props		Les propriétés du composant [UserCard]
 * @param {string} props.name	Nom de la personne
 * @param {number} props.age	Âge de la personne
 * @param {string} props.city	Ville de la personne
 */
export function UserCard(props) {
	const { age, city, name } = props;

	return (
		<div className="user-card">
			<p>Nom: <strong>{name}</strong></p>
			<p>Âge: <strong>{age}</strong> ans</p>
			<p>Ville: <strong>{city}</strong></p>
		</div>
	);
}

/**
 * Composant <UserCardChangeAge />
 *
 * @param {object} props         Les propriétés du composant [UserCardWithChangeAge]
 * @param {string} props.name    Nom de la personne
 * @param {number} props.age     Âge de la personne
 * @param {string} props.city    Ville de la personne
 * @param {(currentName: string, newAge: number) => void} props.onChangeAge -- Événement de changement de d'âge
 */
export function UserCardWithChangeAge(props) {
	const { age, city, name, onChangeAge } = props;

	/**
	 * @param {React.FormEvent<HTMLFormElement>} evt
	 */
	function onSubmit(evt) {
		evt.preventDefault();

		// @ts-expect-error : fixme, types age element
		let newAge = evt.currentTarget.elements.age.value;
		onChangeAge(name, newAge);

		// @ts-expect-error : fixme, use ref
		document.querySelector(`#change-age-dialog-${name}`).hidePopover();
	}

	return (
		<div className="user-card-change-age">
			<UserCard age={age} city={city} name={name} />

			<button
				type="button"
				popoverTarget={`change-age-dialog-${name}`}
			>
				Changer l'âge de l'utilisateur
			</button>

			<dialog
				id={`change-age-dialog-${name}`}
				popover="auto"
			>
				<h1>Changer l'âge de {name}</h1>

				<form
					action=""
					method="dialog"
					onSubmit={onSubmit}
				>
					<div className="form-group">
						<label htmlFor={`age-${name}`}>Âge</label>

						<input
							type="number"
							name="age"
							id={`age-${name}`}
							min={1}
							max={120}
							defaultValue={age}
						/>
					</div>

					<button
						type="submit"
						popoverTarget={`change-age-dialog-${name}`}
						popoverTargetAction="hide"
					>
						Changer maintenant
					</button>
				</form>
			</dialog>
		</div>
	);
}
