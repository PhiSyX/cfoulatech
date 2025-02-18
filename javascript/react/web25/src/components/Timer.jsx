import React, { useEffect, useRef, useState } from "react";

export function InfiniteTimer() {
	const [timer, setTimer] = useState(0);

	useEffect(() => {
		let timeout = window.setInterval(
			() => {
				setTimer(
					(currentTimer) => currentTimer + 1
				);
			},
			64,
		);

		return () => {
			window.clearInterval(timeout);
		};
	}, []);

	return (
		<div className="timer">
			<h1>Timer</h1>
			<h2>{timer}</h2>
		</div>
	);
}

export function Timer() {
	const [timer, setTimer] = useState(0);

	const timeoutRef = useRef(0);

	useEffect(() => {
		timeoutRef.current = window.setInterval(
			() => {
				setTimer(
					(currentTimer) => currentTimer + 1
				);
			},
			64,
		);

		return () => {
			window.clearInterval(timeoutRef.current);
		};
	}, []);

	useEffect(() => {
		if (timer === 100) {
			window.clearTimeout(timeoutRef.current);
		}
	}, [timer]);

	return (
		<div className="timer">
			<h1>Timer</h1>
			<h2>{timer}</h2>
		</div>
	);
}
