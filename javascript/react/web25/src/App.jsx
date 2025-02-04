import { useState } from "react";

import "./App.css";

import { Message } from "./components/Message";

function App()
{

	return (
		<>
			<h1>Cfitech</h1>

			<Message nom="Mike"   age={ 24 } city="Bruxelles" />
			<Message nom="Maxime" age={ 20 } city="Namur"     />
		</>
	);

}

export default App;
