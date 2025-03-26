import "../assets/styles/layouts/Header.css";

import React from "react";
import { NavLink } from "react-router-dom";

export function Header() {
	return (
		<header>
			<nav>
				<ul>
					<li>
						<NavLink to="/" >Home</NavLink>
					</li>

					<li>
						<NavLink to="/about" >About</NavLink>
					</li>

					<li>
						<NavLink to="/contact" >Contact</NavLink>
					</li>

					<li>
						<NavLink to="/service" >Bank Account</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
}
