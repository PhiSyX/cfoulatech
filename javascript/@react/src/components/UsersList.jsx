import "../assets/styles/components/UsersList.css";

import React, { useEffect, useState } from "react";

import { UserCard, UserCardWithChangeAge } from "./UserCard";

/**
 * Composant <UsersList />
 */
export function UsersList() {
	const usersList = [
		{
			name: "Mike",
			age: 24,
			city: "Bruxelles",
		},
		{
			name: "Say",
			age: 23,
			city: "Bruxelles",
		},
		{
			name: "Maxime",
			age: 22,
			city: "Bruxelles",
		},
	];

	return (
		<div className="users-list">
			<h1>Liste des utilisateurs</h1>

			<div className="users-list-cards">
				{usersList.map((user) => (
					<UserCard
						key={user.name}
						name={user.name}
						age={user.age}
						city={user.city}
					/>
				))}
			</div>
		</div>
	);
}

/**
 * Composant <UserListWithState />
 */
export function UsersListWithState() {
	const usersList = [
		{
			name: "Erica",
			age: 19,
			city: "Bruxelles",
		},
		{
			name: "Carina",
			age: 20,
			city: "Bruxelles",
		},
		{
			name: "Olga",
			age: 21,
			city: "Bruxelles",
		},
	];

	const [users, setUsers] = useState(usersList);

	/**
	 * Change l'âge d'un utilisateur.
	 *
	 * @param {string} currentUserName
	 * @param {number} newUserAge
	 */
	const onChangeUserAge = (currentUserName, newUserAge) => {
		setUsers((users) =>
			users.map((user) => {
				if (user.name === currentUserName) {
					return { ...user, age: newUserAge };
				}
				return user;
			}),
		);
	};

	return (
		<div className="users-list">
			<h1>Liste des utilisateurs #2</h1>

			<div className="users-list-cards">
				{users.map((user) => (
					<UserCardWithChangeAge
						name={user.name}
						age={user.age}
						city={user.city}
						onChangeAge={onChangeUserAge}
						key={user.name}
					/>
				))}
			</div>
		</div>
	);
}

/**
 * Composant <UsersListApi />
 * @param {object} props
 * @param {string} props.url
 */
export function UsersListApi(props) {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await fetch(props.url);
				if (!response.ok) {
					throw new Error(
						"Erreur lors de la récupération des utilisateurs",
					);
				}
				const data = await response.json();
				setUsers(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchUsers();
	}, [props.url]);

	if (loading) {
		return <p>Chargement en cours...</p>;
	}
	if (error) {
		return <p>{error}</p>;
	}

	return (
		<div className="users-list">
			<h1>Liste des utilisateurs</h1>

			<div className="users-list-cards">
				{users.map((user) => (
					<UserCard
						name={user.name}
						city={user.address.city}
						key={user.id}
					/>
				))}
			</div>
		</div>
	);
}
