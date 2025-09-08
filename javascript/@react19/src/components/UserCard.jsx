import "../assets/styles/components/UserCard.css";

import React, { useRef } from "react";

/**
 * Composant <UserCard />
 *
 * @param {object}  props		 Les propriétés du composant [UserCard]
 * @param {number}  props.id	 ID
 * @param {string}  props.name	 Nom de la personne
 * @param {string}  props.email	 Email de la personne
 * @param {string}  props.city	 Ville de la personne
 * @param {string} [props.phone] Numéro de la personne
 */
export function UserCard(props) {
	const { id, email, city, name, phone } = props;

	return (
		<div className="user-card">
			<p>
				ID: <strong>{id}</strong>
			</p>

			<p>
				Nom: <strong>{name}</strong>
			</p>

			<p>
				Ville: <strong>{city}</strong>
			</p>

			<p>
				Email: <strong>{email}</strong>
			</p>

			{phone && (
				<p>
					N° de tel: <strong>{phone}</strong>
				</p>
			)}
		</div>
	);
}

/**
 * Composant <UserCardChangeAge />
 *
 * @param {object} props       Les propriétés du composant [UserCardWithChangeAge]
 * @param {number} props.id    ID
 * @param {string} props.name  Nom de la personne
 * @param {number} props.age   Âge de la personne
 * @param {string} props.email Email de la personne
 * @param {string} props.city  Ville de la personne
 * @param {(_: string,__: number) => void} props.onChangeAge Événement de changement de d'âge
 */
export function UserCardWithChangeAge(props) {
	const { id, age, email, city, name, onChangeAge } = props;

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
				id={id}
				email={email}
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
