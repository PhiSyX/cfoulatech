import React, { useState } from "react";

/**
 * Composant <Counter />
 *
 * @param {object} props -- Les propriétés du composant Counter
 * @param {number} props.initialValue -- Valeur initiale
 * @param {number} [props.step=1] -- Étape d'incrémentation/décrémentation
 */
export function Counter(props) {
	const [count, setCount] = useState(props.initialValue);

	const step = props.step || 1;

	/**
	 * Remet à le compteur à son état initial.
	 */
	function reset() {
		setCount(props.initialValue);
	}

	/**
	 * Incrémente le compteur.
	 * @param {React.MouseEvent<HTMLButtonElement>} evt
	 */
	function increment(evt) {
		if (evt.altKey) {
			reset();
		} else {
			setCount((count) => count + step);
		}
	}

	/**
	 * Décrémente le compteur.
	 * @param {React.MouseEvent<HTMLButtonElement>} evt
	 */
	function decrement(evt) {
		if (evt.altKey) {
			reset();
		} else {
			setCount((count) => count - step);
		}
	}

	return (
		<div className="counter">
			<button
				type="button"
				onClick={increment}
			>
				Incrémenter {count}
			</button>

			<button
				type="button"
				onClick={decrement}
			>
				Décrémenter {count}
			</button>
		</div>
	);
}
