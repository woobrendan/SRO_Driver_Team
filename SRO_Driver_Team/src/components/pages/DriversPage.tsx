import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState } from "../../store/store";
import type { Driver } from "../../types/drivers";
import SearchList from "../../components/SearchList";

const DRIVER_KEYS: (keyof Driver)[] = ["label"];

const DriversPage = () => {
	const drivers = useSelector((state: RootState) => state.drivers.driversArr);

	return (
		<div>
			<Link to="/">← Back</Link>
			<h1>Drivers</h1>
			<SearchList<Driver>
				items={drivers}
				getKey={(d) => d._id}
				searchKeys={DRIVER_KEYS}
				placeholder="Search drivers..."
				renderItem={(d) => <div>{d.label}</div>}
			/>
		</div>
	);
};

export default DriversPage;
