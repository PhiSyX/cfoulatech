import React from "react";

/**
 * Composant <Message />
 *
 * @param {object} props      Les propriétés du composant
 * @param {string} props.text Le texte du message
 */
export function Message(props)
{
	return (
		<div className="message">
			<p>{props.text}</p>
		</div>
	);
}
