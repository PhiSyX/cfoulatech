import React, { useEffect, useState } from "react";
import { UsersList } from "../components/UsersList";

const DEFAULT_API_USERS = "https://jsonplaceholder.typicode.com/users";

/**
 * @param {string} endpoint
 * @param {AbortSignal} signal
 */
async function fetchUsers(endpoint, signal) {
	const response = await fetch(endpoint, { signal });
	if (response.ok === null) {
		throw new Error("Erreur lors de la récupération des utilisateurs");
	}
	return response.json();
}

/**
 * @param {object} props
 * @param {string} [props.endpoint]
 */
export function ApiUsers(props) {
	let endpoint = props.endpoint || DEFAULT_API_USERS;

	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let abortController = new AbortController();

		fetchUsers(endpoint, abortController.signal)
			.then(setUsers)
			.catch((e) => console.error("fetch(ApiUsers):", e.message))
			.finally(() => setLoading(false));

		return () => {
			abortController.abort();
		};
	}, [endpoint]);

	if (loading) {
		return <p>Chargement en cours...</p>;
	}

	return <UsersList users={users} />;
}
