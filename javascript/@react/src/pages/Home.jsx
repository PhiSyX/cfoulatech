import "../assets/styles/pages/Home.css";

import React from "react";
import { useMousePosition } from "../hooks/useMousePosition";

export function Home() {
	const { x, y } = useMousePosition();

	return (
		<div className="page-home">
			<h1>Home page X={x} et Y={y}</h1>
		</div>
	);
}
