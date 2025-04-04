import { useEffect, useState } from "react";

export function useMousePosition() {
	const [coords, setCoords] = useState({ x: 0, y: 0 });

	useEffect(() => {
		/**
		 * @param {MouseEvent} evt
		 */
		const handleMove = (evt) => {
			setCoords({
				x: evt.x,
				y: evt.y,
			});
		};

		window.addEventListener("mousemove", handleMove);

		return () => {
			window.removeEventListener("mousemove", handleMove);
		};
	}, []);

	return coords;
}
