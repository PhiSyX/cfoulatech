import { useState } from "react";

/**
 * Composant <Counter />
 *
 * @param {object} props -- Les propriétés du composant Counter
 * @param {number} props.initialValue -- Valeur initiale
 * @param {number} props.step -- Étape d'incrémentation/décrémentation
 */
export function Counter(props) {
	const [count, setCount] = useState(props.initialValue);

	const step = props.step || 1;

	function reset() {
		setCount(props.initialValue);
	}

	/**
	 * @param {MouseEvent} evt
	 */
	function increment(evt) {
		if (evt.altKey) {
			reset();
		} else {
			setCount((count) => count + step);
		}
	}

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
