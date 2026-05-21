import { useDispatch } from "react-redux";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { useEffect } from "react";

const App = () => {
	const dispatch = useDispatch();

	// useEffect(() => {
	// 	dispatch(fetchSeries());
	// }, [dispatch]);

	return (
		<Router>
			{/* <NavBar /> */}
			<div className="App">
				<Routes>{/* <Route path="/" element={<Podium />} /> */}</Routes>
			</div>
		</Router>
	);
};

export default App;
