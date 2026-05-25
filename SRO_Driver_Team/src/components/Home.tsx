import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div>
			<h1>Select List</h1>

			<div>
				<Link to="/team">
					<button>Teams</button>
				</Link>

				<Link to="/driver">
					<button>Drivers</button>
				</Link>
			</div>
		</div>
	);
};

export default Home;
