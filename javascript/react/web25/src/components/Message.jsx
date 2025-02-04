/**
 * @param {{ nom: string; age: number; city: string }} props
 */
export function Message(props) {
	return (
		<ul className="message">
			<li>
				<strong>{props.nom}</strong>{" "}
			</li>

			<li>
				Âge: <strong>{props.age}</strong> ans
			</li>

			<li>
				Ville: <strong>{props.city}</strong>
			</li>
		</ul>
	);
}
