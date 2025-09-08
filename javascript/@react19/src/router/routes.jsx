import React from "react";

import PageHome from "../pages/PageHome";
import PageAbout from "../pages/PageAbout";
import PageContact from "../pages/PageContact";
import PageTodolist from "../pages/PageTodolist";
import PageUserProfile from "../pages/PageUserProfile";

import PageServiceBankAccount from "../pages/services/PageServiceBankAccount";
import PageServiceMagasin from "../pages/services/PageServiceMagasin";
import PageServiceRestaurant from "../pages/services/PageServiceRestaurant";

import PageWebsocket from "../pages/com/PageWebsocket";

import ApiUsers from "../api/ApiUsers";
import ApiUserDetails from "../api/ApiUserDetails";

import { Counter } from "../components/Counter";
import { MouseTracker } from "../components/MouseTracker";
import { InfiniteTimer, Timer } from "../components/Timer";

export const ROUTES = [
	{
		path: "",
		label: "Pages",
		group: [
			{
				path: "/",
				label: PageHome.name,
				component: () => <PageHome />,
			},

			{
				path: "/about",
				label: PageAbout.name,
				component: () => <PageAbout />,
			},

			{
				path: "/contact",
				label: PageContact.name,
				component: () => <PageContact />,
			},

			{
				path: "/todolist",
				label: PageTodolist.name,
				component: () => <PageTodolist />,
			},

			{
				path: "/user-profile",
				label: PageUserProfile.name,
				component: () => <PageUserProfile />,
			},
		],
	},

	/** Components */
	{
		path: "/components",
		label: "Composants",
		group: [
			{
				path: "/counter",
				label: Counter.name,
				component: () => (
					<Counter
						min={0}
						max={30}
					/>
				),
			},
			{
				path: "/mouse-tracker",
				label: MouseTracker.name,
				component: () => <MouseTracker />,
			},
			{
				path: "/timer",
				label: Timer.name,
				component: () => <Timer limit={1000} />,
			},
			{
				path: "/timer/infinite",
				label: InfiniteTimer.name,
				component: () => <InfiniteTimer />,
			},
		],
	},

	/** API */
	{
		path: "/api",
		label: "API",
		group: [
			{
				path: "/users",
				label: ApiUsers.name,
				component: () => <ApiUsers />,
			},
			{
				path: "/user",
				label: ApiUserDetails.name,
				component: () => <ApiUserDetails />,
			},
		],
	},

	/** Communications */
	{
		path: "/com",
		label: "Communications",
		group: [
			{
				path: "/websocket",
				label: PageWebsocket.name,
				component: () => <PageWebsocket />,
			},
		],
	},

	/** Services */
	{
		path: "/services",
		label: "Services",
		group: [
			{
				path: "/bank-account",
				label: PageServiceBankAccount.name,
				component: () => <PageServiceBankAccount />,
			},
			{
				path: "/magasin",
				label: PageServiceMagasin.name,
				component: () => <PageServiceMagasin />,
			},
			{
				path: "/restaurant",
				label: PageServiceRestaurant.name,
				component: () => <PageServiceRestaurant />,
			},
		],
	},
];
