import { useAppDispatch } from "./app/hooks";
import { fetchTeams } from "./store/teams/teamsActions";

import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { useEffect } from "react";

const App = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchTeams());
	}, [dispatch]);

	return (
		<Router>
			{/* <NavBar /> */}
			<div className="App">
				<Routes>{/* <Route path="/" element={<Podium />} /> */}</Routes>
			</div>
			<h1>Hello World</h1>
		</Router>
	);
};

export default App;
