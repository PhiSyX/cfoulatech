import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Header } from "./components/Header";

import About from "./pages/About";
import BankAccount from "./pages/BankAccount";
import Contact from "./pages/Contact";
import Formation from "./pages/Formation";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

export function App() {
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
					path="/formation"
					element={<Formation />}
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
