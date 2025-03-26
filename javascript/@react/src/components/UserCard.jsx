import "../assets/styles/components/UserCard.css";

import React, { useRef } from "react";

/**
 * Composant <UserCard />
 *
 * @param {object} props		       Les propriétés du composant [UserCard]
 * @param {string} props.name	       Nom de la personne
 * @param {number} props.age	       Âge de la personne
 * @param {string} props.city	       Ville de la personne
 * @param {string} [props.nationality] Nationalité de la personne
 */
export function UserCard(props) {
	const { age, city, name, nationality } = props;

	return (
		<div className="user-card">
			<p>
				Nom: <strong>{name}</strong>
			</p>
			<p>
				Âge: <strong>{age}</strong> ans
			</p>
			<p>
				Ville: <strong>{city}</strong>
			</p>

			{nationality && (
				<p>
					Nationalité: <strong>{nationality}</strong>
				</p>
			)}
		</div>
	);
}

/**
 * Composant <UserCardChangeAge />
 *
 * @param {object} props       Les propriétés du composant [UserCardWithChangeAge]
 * @param {string} props.name  Nom de la personne
 * @param {number} props.age   Âge de la personne
 * @param {string} props.city  Ville de la personne
 * @param {(_: string,__: number) => void} props.onChangeAge Événement de changement de d'âge
 */
export function UserCardWithChangeAge(props) {
	const { age, city, name, onChangeAge } = props;

	/**
	 * @type {React.RefObject<HTMLDialogElement|null>}
	 */
	const dialogRef = useRef(null);

	/**
	 * @param {React.FormEvent<HTMLFormElement>} evt
	 */
	const onSubmit = (evt) => {
		evt.preventDefault();

		// @ts-expect-error : FIXME, types age element
		let newAge = evt.currentTarget.elements.age.value;
		onChangeAge(name, newAge);

		dialogRef.current?.hidePopover();
	};

	return (
		<div className="user-card-change-age">
			<UserCard
				age={age}
				city={city}
				name={name}
			/>

			<button
				type="button"
				popoverTarget={`change-age-dialog-${name}`}
			>
				Changer l'âge de l'utilisateur
			</button>

			<dialog
				id={`change-age-dialog-${name}`}
				popover="auto"
				ref={dialogRef}
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
