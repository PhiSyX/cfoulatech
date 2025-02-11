/**
 * Composant <Message />
 *
 * @param {object} props -- Les propriétés d'un composants
 * @param {string} props.text -- Message du composant
 */
export function Message(props) {
	return (
		<div className="message">
			<p>{props.text}</p>
		</div>
	);
}
