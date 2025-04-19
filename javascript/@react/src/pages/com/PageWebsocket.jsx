import React, { useState, useEffect } from "react";

export default function PageWebsocket() {
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		const socket = new WebSocket("wss://echo.websocket.org/");

		socket.addEventListener("message", (event) => {
			setMessages((msgs) => [...msgs, event.data]);
		});

		return () => {
			socket.close();
		};
	});

	return (
		<div>
			<h2>Messages reçus</h2>

			{messages.map((msg) => (
				<li key={msg}>{msg}</li>
			))}
		</div>
	);
}
