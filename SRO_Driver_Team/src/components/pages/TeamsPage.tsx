import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addTeamThunk, updateTeamThunk, deleteTeamThunk } from "../../store/teams/teamsActions";
import type { Team } from "../../types/teams";
import SearchList from "../SearchList";
import EditModal from "../EditModal";

const TEAM_KEYS: (keyof Team)[] = ["label"];
const byLabel = (a: Team, b: Team) => a.label.localeCompare(b.label, undefined, { sensitivity: "base", numeric: true });

const TeamsPage = () => {
	const dispatch = useAppDispatch();
	const teams = useAppSelector((state) => state.teams.teamsArr);
	const [selected, setSelected] = useState<Team | null>(null);
	const [adding, setAdding] = useState(false);

	const [listKey, setListKey] = useState(0);
	const resetList = () => setListKey((k) => k + 1);

	return (
		<div>
			<h1>Teams</h1>
			<SearchList<Team>
				items={teams}
				key={listKey}
				getKey={(t) => t._id}
				getTitle={(t) => t.label}
				searchKeys={TEAM_KEYS}
				sortFn={byLabel}
				placeholder="Search teams..."
				renderItem={(t) => <strong className="search-list__text">{t.label}</strong>}
				onItemClick={setSelected}
				onAdd={() => setAdding(true)}
				addLabel="Add Team"
			/>

			{selected && (
				<EditModal
					title="Edit Team"
					initialLabel={selected.label}
					onSave={(label) => dispatch(updateTeamThunk({ ...selected, label, value: label }))}
					onDelete={async () => {
						await dispatch(deleteTeamThunk(selected));
						resetList();
					}}
					onClose={() => setSelected(null)}
				/>
			)}

			{adding && (
				<EditModal
					title="Add Team"
					onSave={(label) => dispatch(addTeamThunk(label))}
					onClose={() => setAdding(false)}
				/>
			)}
		</div>
	);
};

export default TeamsPage;
