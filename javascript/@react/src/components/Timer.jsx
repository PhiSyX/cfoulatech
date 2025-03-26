import React, { useEffect, useRef, useState } from "react";

export function InfiniteTimer() {
	const [timer, setTimer] = useState(0);

	useEffect(() => {
		let timeout = window.setInterval(() => {
			setTimer((currentTimer) => currentTimer + 1);
		}, 64);

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

/**
 * @param {object} props
 * @param {number} [props.limit=1_000]
 * @param {boolean} [props.pauseBtn=false]
 * @returns {React.JSX.Element}
 */
export function Timer(props) {
	const [timer, setTimer] = useState(0);
	const limit = props.limit ?? 1_000;
	const timeoutRef = useRef(0);

	const clearTimer = () => {
		setTimer(0);
	};

	const pauseTimer = () => {
		window.clearInterval(timeoutRef.current);
	};

	const startTimer = () => {
		pauseTimer();

		if (timer >= limit) {
			return;
		}

		timeoutRef.current = window.setInterval(() => {
			setTimer((currentTimer) => currentTimer + 1);
		}, 64);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: chut
	useEffect(() => {
		startTimer();

		return () => {
			pauseTimer();
		};
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: chut
	useEffect(() => {
		if (timer >= limit) {
			pauseTimer();
		}
	}, [timer, limit]);

	return (
		<div className="timer">
			<h1>Timer</h1>
			<h2>{timer}</h2>

			{props.pauseBtn && (
				<>
					<button
						type="button"
						disabled={timer >= limit}
						onClick={startTimer}
					>
						Start
					</button>

					<button
						type="button"
						onClick={pauseTimer}
					>
						Pause
					</button>

					<button
						type="button"
						onClick={clearTimer}
					>
						Clear
					</button>
				</>
			)}
		</div>
	);
}
