// components/pages/DriversPage.tsx
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addDriverThunk, updateDriverThunk, deleteDriverThunk } from "../../store/drivers/driversActions";
import type { Driver } from "../../types/drivers";
import SearchList from "../SearchList";
import EditModal from "../EditModal";

const DRIVER_KEYS: (keyof Driver)[] = ["label"];
const byLabel = (a: Driver, b: Driver) =>
	a.label.localeCompare(b.label, undefined, { sensitivity: "base", numeric: true });

const DriversPage = () => {
	const dispatch = useAppDispatch();
	const drivers = useAppSelector((state) => state.drivers.driversArr);
	const [selected, setSelected] = useState<Driver | null>(null);
	const [adding, setAdding] = useState(false);

	const [listKey, setListKey] = useState(0);
	const resetList = () => setListKey((k) => k + 1);

	return (
		<div>
			<h1>Drivers</h1>
			<SearchList<Driver>
				items={drivers}
				key={listKey}
				getKey={(d) => d._id}
				getTitle={(d) => d.label}
				searchKeys={DRIVER_KEYS}
				sortFn={byLabel}
				placeholder="Search drivers..."
				renderItem={(d) => <strong className="search-list__text">{d.label}</strong>}
				onItemClick={setSelected}
				onAdd={() => setAdding(true)}
				addLabel="Add Driver"
			/>

			{selected && (
				<EditModal
					title="Edit Driver"
					initialLabel={selected.label}
					onSave={(label) => dispatch(updateDriverThunk({ ...selected, label, value: label }))}
					onDelete={async () => {
						await dispatch(deleteDriverThunk(selected));
						resetList();
					}}
					onClose={() => setSelected(null)}
				/>
			)}

			{adding && (
				<EditModal
					title="Add Driver"
					onSave={(label) => dispatch(addDriverThunk(label))}
					onClose={() => setAdding(false)}
				/>
			)}
		</div>
	);
};

export default DriversPage;
