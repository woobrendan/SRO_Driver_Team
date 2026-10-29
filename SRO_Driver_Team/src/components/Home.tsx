import { useNavigate } from "react-router-dom";
import "../styling/list.css";

const Home = () => {
	const navigate = useNavigate();

	return (
		<div>
			<h1>Select List</h1>

			<div>
				<button onClick={() => navigate("/teams")}>Teams</button>
				<button onClick={() => navigate("/drivers")}>Drivers</button>
			</div>
		</div>
	);
};

export default Home;
