import React from "react";

import { useMousePosition } from "../hooks/useMousePosition";

export function MouseTracker() {
	const { x, y } = useMousePosition();

	return (
		<ul>
			<li>Position en X: {x}</li>
			<li>Position en Y: {y}</li>
		</ul>
	);
}
