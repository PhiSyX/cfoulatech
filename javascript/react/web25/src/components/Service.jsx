import React from "react";

/**
 * @param {{address: string}} props
 */
export function Service(props) {
	return (
		<div className="service">
			<h1>Service</h1>
			<p>{props.address}</p>
		</div>
	);
}
