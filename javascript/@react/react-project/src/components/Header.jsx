import { NavLink } from "react-router-dom";

import "./Header.css";

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
						<NavLink to="/formation" >Présence</NavLink>
					</li>

					<li>
						<NavLink to="/service" >Bank Account</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
}

const checkActive = ({ isActive, isPending }) =>
	isPending ? "pending" : isActive ? "active" : "";
