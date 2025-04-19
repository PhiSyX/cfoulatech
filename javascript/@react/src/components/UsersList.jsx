import "../assets/styles/components/UsersList.css";

import React, { useState } from "react";

import { UserCard, UserCardWithChangeAge } from "./UserCard";

/**
 * Composant <UsersList users />
 *
 * @param {object} props
 * @param {Array<Record<string,any>>} props.users
 */
export function UsersList(props) {
	console.log(props);
	return (
		<div className="users-list">
			<h1>Liste des utilisateurs</h1>

			<div className="users-list-cards">
				{props.users.map((user) => (
					<UserCard
						id={user.id}
						key={user.name}
						name={user.name}
						email={user.email}
						city={user.address.city}
						phone={user.phone}
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
			id: 1,
			name: "Erica",
			age: 19,
			city: "Bruxelles",
		},
		{
			id: 2,
			name: "Carina",
			age: 20,
			city: "Bruxelles",
		},
		{
			id: 3,
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
						id={user.id}
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
