import React from "react";

/**
 * @param {object} props          Propriété du composant [Service]
 * @param {string} props.address  Adresse du service
 */
export function Service(props) {
	return (
		<div className="service">
			<h1>Service</h1>
			<p>{props.address}</p>
		</div>
	);
}
