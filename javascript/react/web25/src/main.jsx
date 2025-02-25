import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";

import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "about",
		element: <About />,
	},
	{
		path: "contact",
		element: <Contact />,
	},
	{
		path: "*",
		element: <NotFound />,
	},
]);

createRoot(document.getElementById("root")).render(
	<RouterProvider router={router} />,
);
