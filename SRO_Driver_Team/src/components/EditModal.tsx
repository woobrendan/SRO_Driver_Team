import { useState } from "react";
import Modal from "./Modal";

type EditModalProps = {
	title: string;
	initialLabel?: string;
	onSave: (label: string) => Promise<unknown> | unknown;
	onDelete?: () => Promise<unknown> | unknown;
	onClose: () => void;
};

const EditModal = ({ title, initialLabel = "", onSave, onDelete, onClose }: EditModalProps) => {
	const [label, setLabel] = useState(initialLabel);

	const handleSave = async () => {
		const trimmed = label.trim();
		if (!trimmed) return;
		await onSave(trimmed);
		onClose();
	};

	const handleDelete = async () => {
		if (!onDelete) return;
		if (!window.confirm(`Delete ${initialLabel}?`)) return;
		await onDelete();
		onClose();
	};

	return (
		<Modal title={title} onClose={onClose}>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleSave();
				}}
			>
				<input type="text" value={label} onChange={(e) => setLabel(e.target.value)} autoFocus />
				<div className="modal__actions">
					{onDelete && (
						<button type="button" onClick={handleDelete}>
							Delete
						</button>
					)}
					<button type="button" onClick={onClose}>
						Cancel
					</button>
					<button type="submit">Save</button>
				</div>
			</form>
		</Modal>
	);
};

export default EditModal;
