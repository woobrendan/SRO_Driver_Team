import { useAppDispatch } from "./app/hooks";
import { fetchTeams } from "./store/teams/teamsActions";

import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { useEffect } from "react";

import Home from "./components/Home";
import TeamsPage from "./components/pages/TeamsPage";
import DriversPage from "./components/pages/DriversPage";
import { fetchDrivers } from "./store/drivers/driversActions";
// import ListDisplay from "./components/ListDisplay";

const App = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchTeams());
		dispatch(fetchDrivers());
	}, [dispatch]);

	return (
		<Router>
			{/* <NavBar /> */}
			<div className="App">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/teams" element={<TeamsPage />} />
					<Route path="/drivers" element={<DriversPage />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
