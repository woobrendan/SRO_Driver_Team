import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { fetchTeams } from "../store/teams/teamsActions";
import { fetchDrivers } from "../store/drivers/driversActions";
import type { Team } from "../types/teams";
import type { Driver } from "../types/drivers";
import SearchList from "./SearchList";

type View = "teams" | "drivers";

// Keep these outside the component so their references stay stable
const TEAM_KEYS: (keyof Team)[] = ["label"];
const DRIVER_KEYS: (keyof Driver)[] = ["label"];

const Directory = () => {
	const dispatch = useDispatch<AppDispatch>();
	const [view, setView] = useState<View>("teams");

	const teams = useSelector((state: RootState) => state.teams.teamsArr);
	const drivers = useSelector((state: RootState) => state.drivers.driversArr);

	useEffect(() => {
		dispatch(fetchTeams());
		dispatch(fetchDrivers());
	}, [dispatch]);

	return (
		<div>
			<div className="directory__tabs">
				<button onClick={() => setView("teams")} disabled={view === "teams"}>
					Teams
				</button>
				<button onClick={() => setView("drivers")} disabled={view === "drivers"}>
					Drivers
				</button>
			</div>

			{view === "teams" ? (
				<SearchList<Team>
					items={teams}
					getKey={(t) => t._id}
					searchKeys={TEAM_KEYS}
					placeholder="Search teams..."
					renderItem={(t) => <div>{t.label}</div>}
				/>
			) : (
				<SearchList<Driver>
					items={drivers}
					getKey={(d) => d._id}
					searchKeys={DRIVER_KEYS}
					placeholder="Search drivers..."
					renderItem={(d) => <div>{d.label}</div>}
				/>
			)}
		</div>
	);
};

export default Directory;
