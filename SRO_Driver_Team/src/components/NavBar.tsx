import { NavLink } from "react-router-dom";
import api from "../api/api";

type NavBarProps = {
	onLogout: () => void;
};

const NavBar = ({ onLogout }: NavBarProps) => {
	const handleLogout = async () => {
		try {
			await api.post("/auth/logout");
		} finally {
			onLogout();
		}
	};

	return (
		<nav className="navbar">
			<NavLink to="/" end className="navbar__brand">
				Home
			</NavLink>

			<div className="navbar__links">
				<NavLink to="/teams" className="navbar__link">
					Teams
				</NavLink>
				<NavLink to="/drivers" className="navbar__link">
					Drivers
				</NavLink>
				<button type="button" className="navbar__link" onClick={handleLogout}>
					Log out
				</button>
			</div>
		</nav>
	);
};

export default NavBar;
