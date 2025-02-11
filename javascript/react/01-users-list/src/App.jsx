import "./App.css";

import { UserList, UserListWithState } from "./components/UserList";

function App() {
	return (
		<>
			<h1>CFITECH</h1>

			<UserList />

			<UserListWithState />
		</>
	);
}

export default App;
