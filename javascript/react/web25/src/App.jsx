import "./App.css";

import { Counter } from "./components/Counter";
import { Message } from "./components/Message";
import { UserCard } from "./components/UserCard";

function App() {
	return (
		<>
			<h1>Cfitech</h1>

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
		</>
	);
}

export default App;
