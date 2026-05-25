import { useParams } from "react-router-dom";

import { useAppSelector } from "../app/hooks";

const ListDisplay = () => {
	const { type } = useParams();

	const teams = useAppSelector((state) => state.teams.teamsArr);

	const drivers = useAppSelector((state) => state.drivers.driversArr);

	const list = type === "teams" ? teams : type === "drivers" ? drivers : [];

	return (
		<div>
			<h1>{type} List</h1>

			<ul>
				{list.map((item) => (
					<li key={item._id}>{item.label}</li>
				))}
			</ul>
		</div>
	);
};

export default ListDisplay;
