import "../assets/styles/layouts/Header.css";

import React from "react";

import { NavLink } from "react-router-dom";
import { ROUTES } from "../router/routes";
import { pascalcase } from "../../lib/capitalization/pascalcase";

/**
 * @param {string} str
 * @returns {string}
 */
function title(str)
{
	return pascalcase(str.replace(/^(PageService|Page)/g, ""));
}

export function Header()
{
	return (
		<header>
			<nav>
				<ul>
					{ROUTES.map((routeGroup) => (
						<li
							key={routeGroup.path}
							className={
								routeGroup.group.length > 0 ? "dropdown" : ""
							}
						>
							{routeGroup.group.length > 0 ? (
								<strong>{routeGroup.label}</strong>
							) : (
								<NavLink to={routeGroup.path}>
									{routeGroup.label}
								</NavLink>
							)}

							{routeGroup.group.length > 0 && (
								<ul>
									{routeGroup.group.map((route) => (
										<li key={routeGroup.path + route.path}>
											<NavLink
												to={
													routeGroup.path + route.path
												}
											>
												{title(route.label)}
											</NavLink>
										</li>
									))}
								</ul>
							)}
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
}
