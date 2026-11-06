import { useNavigate } from "react-router-dom";
import "../styling/home.css";

const Home = () => {
	const navigate = useNavigate();

	return (
		<div className="home">
			<h1 className="home__title">Select List</h1>

			<div className="home__cards">
				<button type="button" className="home__card" onClick={() => navigate("/teams")}>
					<span className="home__card-title">Teams</span>
				</button>

				<button type="button" className="home__card" onClick={() => navigate("/drivers")}>
					<span className="home__card-title">Drivers</span>
				</button>
			</div>
		</div>
	);
};

export default Home;
