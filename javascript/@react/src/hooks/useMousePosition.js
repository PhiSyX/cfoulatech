import { useEffect, useState } from "react";

export function useMousePosition() {
	const [x, setX] = useState(0);
	const [y, setY] = useState(0);

	useEffect(() => {
		/**
		 * @param {MouseEvent} evt
		 */
		const handleMove = (evt) => {
			setX(evt.x);
			setY(evt.y);
		};

		window.addEventListener("mousemove", handleMove);

		return () => {
			window.removeEventListener("mousemove", handleMove);
		};
	}, []);

	return { x, y };
}
