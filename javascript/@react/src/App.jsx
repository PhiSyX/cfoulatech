import "./assets/styles/global.css";

import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Header } from "./layouts/Header";
import { ROUTES } from "./router/routes";

import PageNotFound from "./pages/PageNotFound";

function App() {
	return (
		<BrowserRouter>
			<Header />

			<Routes>
				{ROUTES.map((routeGroup) =>
					routeGroup.group.map((route) => (
						<Route
							key={routeGroup.path + route.path}
							path={routeGroup.path + route.path}
							element={route.component()}
						/>
					)),
				)}

				<Route
					path="*"
					element={<PageNotFound />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
