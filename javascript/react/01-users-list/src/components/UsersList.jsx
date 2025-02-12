import "./UsersList.css";

import React, { useState } from "react";

import { UserCard, UserCardWithChangeAge } from "./UserCard";

const usersList = [
	{
		name: "Mike",
		age: 24,
		city: "Bruxelles",
	},
	{
		name: "Jeremy",
		age: 32,
		city: "Bruxelles",
	},
	{
		name: "Mohamed-Ali",
		age: 20,
		city: "Bruxelles",
	},
];

/**
 * Composant <UserList />
 */
export function UsersList() {
	return (
		<div className="users-list">
			<h1>Liste des utilisateurs</h1>

			<div className="users-list-cards">
				{usersList.map((user) => (
					<UserCard
						name={user.name}
						age={user.age}
						city={user.city}
						key={user.name}
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
	const [users, setUsers] = useState(usersList);

	/**
	 * Change l'âge d'un utilisateur.
	 *
	 * @param {string} currentUserName
	 * @param {number} newUserAge
	 */
	function onChangeUserAge(currentUserName, newUserAge) {
		setUsers((users) => users.map((user) => {
			if (user.name === currentUserName) {
				return { ...user, age: newUserAge };
			}
			return user;
		}));
	}

	return (
		<div className="users-list">
			<h1>Liste des utilisateurs</h1>

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
