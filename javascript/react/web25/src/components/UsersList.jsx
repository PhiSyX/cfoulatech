import "./UsersList.css";

import React, { useState } from "react";

import { UserCard, UserCardWithChangeAge } from "./UserCard";

/**
 * Composant <UsersList />
 */
export function UsersList()
{
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
export function UsersListWithState()
{
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
		setUsers((users) => users.map((user) => {
			if (user.name === currentUserName) {
				return { ...user, age: newUserAge };
			}
			return user;
		}));
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
