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
