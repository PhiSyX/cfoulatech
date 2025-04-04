import React, { useState, useEffect } from "react";

export function WebSocket$() {
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		const socket = new WebSocket("wss://echo.websocket.org/");

		socket.addEventListener("message", (event) => {
			setMessages((prev) => [...prev, event.data]);
		});

		return () => {
			socket.close();
		};
	});

	return (
		<div>
			<h2>Messages reçus</h2>

			{messages.map((msg, index) => (
				<li key={index}>{msg}</li>
			))}
		</div>
	);
}
