import React, { useEffect, useState } from "react";

import { UserCard } from "../components/UserCard";

const DEFAULT_API_USERS = "https://jsonplaceholder.typicode.com/users/%d";

/**
 * @param {string} endpoint
 * @param {number} id
 * @param {AbortSignal} signal
 */
async function fetchUser(endpoint, id, signal) {
	let response = await fetch(endpoint.replace("%d", id.toString()), {
		signal,
	});

	if (response.ok === false) {
		return null;
	}

	return response.json();
}

/**
 * @param {object} props
 * @param {string} [props.endpoint]
 */
export default function ApiUserDetails(props) {
	let endpoint = props.endpoint || DEFAULT_API_USERS;

	const [id, setId] = useState(1);

	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);

		let abortController = new AbortController();

		fetchUser(endpoint, id, abortController.signal)
			.then(setUser)
			.catch((e) => console.error("fetch(ApiUser):", e.message))
			.finally(() => setLoading(false));

		return () => {
			abortController.abort();
		};
	}, [endpoint, id]);

	if (loading || !user) {
		return <p>Chargement en cours...</p>;
	}

	return (
		<div>
			<UserCard
				id={user.id}
				name={user.name}
				email={user.email}
				city={user.address.city}
				phone={user.phone}
			/>

			<hr />

			{id < 10 && (
				<button
					type="button"
					onClick={() => setId((id) => id + 1)}
				>
					Passer à l'utilisateur n°{id + 1}
				</button>
			)}
		</div>
	);
}
