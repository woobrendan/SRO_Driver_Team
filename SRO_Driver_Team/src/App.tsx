import { useAppDispatch } from "./app/hooks";
import { fetchTeams } from "./store/teams/teamsActions";

import { Routes, Route, Navigate, BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./components/Home";
import TeamsPage from "./components/pages/TeamsPage";
import DriversPage from "./components/pages/DriversPage";
import { fetchDrivers } from "./store/drivers/driversActions";
import NavBar from "./components/NavBar";
import LoginPage from "./components/pages/LoginPage";
import api from "./api/api";

const App = () => {
	const dispatch = useAppDispatch();
	const [authed, setAuthed] = useState<boolean | null>(null); // null = still checking

	useEffect(() => {
		api.get("/auth/me")
			.then(() => setAuthed(true))
			.catch(() => setAuthed(false));
	}, []);

	useEffect(() => {
		if (authed) {
			dispatch(fetchTeams());
			dispatch(fetchDrivers());
		}
	}, [authed, dispatch]);

	if (authed === null) return null; // or a small spinner

	return (
		<Router>
			{authed && <NavBar onLogout={() => setAuthed(false)} />}
			<div className="App">
				<Routes>
					{authed ? (
						<>
							<Route path="/" element={<Home />} />
							<Route path="/teams" element={<TeamsPage />} />
							<Route path="/drivers" element={<DriversPage />} />
							<Route path="*" element={<Navigate to="/" replace />} />
						</>
					) : (
						<>
							<Route path="/login" element={<LoginPage onLogin={() => setAuthed(true)} />} />
							<Route path="*" element={<Navigate to="/login" replace />} />
						</>
					)}
				</Routes>
			</div>
		</Router>
	);
};

export default App;
