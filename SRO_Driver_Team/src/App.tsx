import { useAppDispatch } from "./app/hooks";
import { fetchTeams } from "./store/teams/teamsActions";

import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { useEffect } from "react";

import Home from "./components/Home";
import ListDisplay from "./components/ListDisplay";

const App = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchTeams());
	}, [dispatch]);

	return (
		<Router>
			{/* <NavBar /> */}
			<div className="App">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/:type" element={<ListDisplay />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
