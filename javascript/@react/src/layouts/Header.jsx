import "../assets/styles/layouts/Header.css";

import React from "react";
import { NavLink } from "react-router-dom";

export function Header() {
	return (
		<header>
			<nav>
				<ul>
					<li>
						<NavLink to="/">Home</NavLink>
					</li>

					<li>
						<NavLink to="/about">About</NavLink>
					</li>

					<li>
						<NavLink to="/contact">Contact</NavLink>
					</li>

					<li className="dropdown">
						<strong>Features</strong>

						<ul>
							<li>
								<NavLink to="/counter">Compteur</NavLink>
							</li>

							<li>
								<NavLink to="/timer">Timer</NavLink>
							</li>

							<li>
								<NavLink to="/timer/infinite">
									Timer infini
								</NavLink>
							</li>
						</ul>
					</li>

					<li className="dropdown">
						<strong>Services</strong>

						<ul>
							<li>
								<NavLink to="/services/bank-account">
									Bank Account
								</NavLink>
							</li>
							<li>
								<NavLink to="/services/magasin">
									Magasin
								</NavLink>
							</li>
							<li>
								<NavLink to="/services/restaurant">
									Restaurant
								</NavLink>
							</li>
						</ul>
					</li>
				</ul>
			</nav>
		</header>
	);
}
