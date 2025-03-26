import "./assets/styles/global.css";

import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Header } from "./layouts/Header";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { BankAccount } from "./pages/BankAccount";
import { NotFound } from "./pages/NotFound";

function App() {
	return (
		<BrowserRouter>
			<Header />

			<Routes>
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
					path="/service"
					element={<BankAccount />}
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
