import "./assets/styles/global.css";

import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Header } from "./layouts/Header";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { BankAccount } from "./pages/BankAccount";
import { NotFound } from "./pages/NotFound";
import { Magasin } from "./pages/Magasin";
import { Restaurant } from "./pages/Restaurant";
import { Counter } from "./components/Counter";
import { InfiniteTimer, Timer } from "./components/Timer";
import { MouseTracker } from "./components/MouseTracker";
import { WebSocket$ } from "./components/WebSocket";
import { UsersPage } from "./pages/Users";

function App() {
	return (
		<BrowserRouter>
			<Header />

			<Routes>
				{/* Pages */}
				<Route
					path="/"
					element={<Home />}
				/>
				<Route
					path="/about"
					element={<About />}
				/>
				<Route
					path="/contact"
					element={<Contact />}
				/>
				<Route
					path="/users"
					element={<UsersPage />}
				/>
				{/* Components */}
				<Route
					path="/components/counter"
					element={
						<Counter
							min={0}
							max={30}
						/>
					}
				/>
				<Route
					path="/components/mouse-tracker"
					element={<MouseTracker />}
				/>
				<Route
					path="/components/timer"
					element={<Timer limit={1000} />}
				/>
				<Route
					path="/components/timer/infinite"
					element={<InfiniteTimer />}
				/>
				<Route
					path="/components/websocket"
					element={<WebSocket$ />}
				/>
				{/* Services */}
				<Route
					path="/services/bank-account"
					element={<BankAccount />}
				/>
				<Route
					path="/services/magasin"
					element={<Magasin />}
				/>
				<Route
					path="/services/restaurant"
					element={<Restaurant />}
				/>
				<Route
					path="/*"
					element={<NotFound />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
