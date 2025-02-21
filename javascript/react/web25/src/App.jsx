import "./App.css";

import React from "react";

// import { Counter } from "./components/Counter";
// import { InfiniteTimer } from "./components/Timer";
import { Timer } from "./components/Timer";
// import { Message } from "./components/Message";
// import { UserCard } from "./components/UserCard";
// import { UsersList } from "./components/UsersList";
// import { Profile } from "./components/Profile";
// import { UserProfile } from "./components/UserProfile";
// import { TasksList } from "./components/TasksList";

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

			<Counter initialValue={0} step={1} min={5} max={10} />

			<hr />

			<UsersList />
			<UserProfile />
			<TasksList />
			*/}

			{/* <InfiniteTimer /> */}

			<Timer limit={100} pauseBtn={true} />
		</>
	);
}

export default App;
