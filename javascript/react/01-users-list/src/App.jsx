import "./App.css";

import React from "react";
import { UsersList, UsersListWithState } from "./components/UsersList";

function App()
{
	return (
		<>
			<h1>CFOULATECH</h1>

			<UsersList />
			<UsersListWithState />
		</>
	);
}

export default App;
