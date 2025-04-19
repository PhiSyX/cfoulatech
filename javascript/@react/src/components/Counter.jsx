import "../assets/styles/components/Counter.css";
import React, { useState } from "react";

import { minmax } from "../../lib/math/minmax";

/**
 * Composant <Counter />
 *
 * @param {object} props -- Les propriétés du composant Counter
 * @param {number} [props.initialValue=0] -- Valeur initiale
 * @param {number} [props.step=1] -- Étape d'incrémentation/décrémentation
 * @param {number} [props.min=Infinity]
 * @param {number} [props.max=Infinity]
 */
export function Counter(props) {
	const min = props.min ?? Number.NEGATIVE_INFINITY;
	const max = props.max ?? Number.POSITIVE_INFINITY;

	const step = props.step || 1;

	const [count, setCount] = useState(
		minmax(min, props.initialValue || 0, max),
	);

	/**
	 * Incrémente le compteur.
	 */
	const increment = () => {
		setCount((count) => minmax(min, count + step, max));
	};

	/**
	 * Décrémente le compteur.
	 */
	const decrement = () => {
		setCount((count) => minmax(min, count - step, max));
	};

	/**
	 * @param {React.ChangeEvent<HTMLInputElement>} e
	 */
	const onChange = (e) => {
		setCount(minmax(min, e.target.valueAsNumber, max));
	};

	return (
		<div className="counter">
			<h1>Compteur: <small>{count}</small></h1>

			<div>
				<button
					type="button"
					onClick={increment}
				>
					Incrémenter
				</button>
				&nbsp;
				<button
					type="button"
					onClick={decrement}
				>
					Décrémenter
				</button>
			</div>

			<div>
				<p>
					Minimum: {min},
					Maximum: {max}
				</p>

				<input
					type="range"
					value={count}
					min={min}
					max={max}
					onChange={onChange}
				/>
			</div>
		</div>
	);
}
