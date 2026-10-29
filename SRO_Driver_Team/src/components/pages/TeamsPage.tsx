import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState } from "../../store/store";

import type { Team } from "../../types/teams";
import SearchList from "../../components/SearchList";

const TEAM_KEYS: (keyof Team)[] = ["label"];

const TeamsPage = () => {
	const teams = useSelector((state: RootState) => state.teams.teamsArr);

	return (
		<div>
			<Link to="/">← Back</Link>
			<h1>Teams</h1>
			<SearchList<Team>
				items={teams}
				getKey={(t) => t._id}
				searchKeys={TEAM_KEYS}
				placeholder="Search teams..."
				renderItem={(t) => <div>{t.label}</div>}
			/>
		</div>
	);
};

export default TeamsPage;
