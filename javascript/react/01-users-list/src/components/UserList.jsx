import "./UserList.css";

import { useState } from "react";

import { UserCard, UserCardWithChangeAge } from "./UserCard";

export function UserList() {
	const users = [
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

	return (
		<div className="user-list">
			<h1>Liste des utilisateurs</h1>

			<div className="user-list-cards">
				{users.map((user) => (
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
export function UserListWithState() {
	const [users, setUsers] = useState([
		{
			name: "Mike",
			age: 24,
			city: "Bruxelles",
			nationality: "Italien",
		},
		{
			name: "Jeremy",
			age: 32,
			city: "Bruxelles",
			nationality: "Français",
		},
		{
			name: "Mohamed-Ali",
			age: 20,
			city: "Bruxelles",
			nationality: "Tunisien",
		},
	]);

	/**
	 * @param {string} currentUserName
	 * @param {number} newAge
	 */
	function onChangeUserAge(currentUserName, newAge) {
		setUsers((users) => {
			return users.map((user) => {
				if (user.name === currentUserName) {
					let newUser = { ...user };
					newUser.age = newAge;
					return newUser;
				}
				return user;
			});
		});
	}

	return (
		<div className="user-list">
			<h1>Liste des utilisateurs</h1>

			<div className="user-list-cards">
				{users.map((user) => (
					<UserCardWithChangeAge
						name={user.name}
						age={user.age}
						city={user.city}
						nationality={user.nationality}
						onChangeAge={onChangeUserAge}
						key={user.name}
					/>
				))}
			</div>
		</div>
	);
}
