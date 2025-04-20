import React from "react";

/**
 * @param {object} props          Propriété du composant [Service]
 * @param {string} props.address  Adresse du service
 */
export default function PageService(props)
{
	return (
		<div className="page-service">
			<h1>Service</h1>
			<p>{props.address}</p>
		</div>
	);
}
