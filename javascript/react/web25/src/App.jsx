import "./App.css";

import React from "react";

// import { Counter } from "./components/Counter";
// import { Message } from "./components/Message";
// import { UserCard } from "./components/UserCard";
// import { UsersList } from "./components/UsersList";
import { Profile } from "./components/Profile";

function App() {
	return (
		<>
			<h1>CFOULATECH</h1>

			{/*
			<Message text="Mon super message" />

			<UserCard
				name="Mike"
				age={24}
				city="Bruxelles"
				nationality="Italie"
			/>

			<hr />

			<UserCard
				name="Maxime"
				age={20}
				city="Bruxelles"
				nationality="Cote d'Ivoire"
			/>

			<hr />

			<Counter initialValue={10} />

			<Counter
				initialValue={5}
				step={2}
			/>

			<hr />


			<UsersList />
			*/}

			<Profile />
		</>
	);
}

export default App;
