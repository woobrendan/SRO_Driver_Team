import { useEffect, type ReactNode } from "react";

type ModalProps = {
	title: string;
	onClose: () => void;
	children: ReactNode;
};

const Modal = ({ title, onClose, children }: ModalProps) => {
	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [onClose]);

	return (
		<div className="modal__backdrop" onClick={onClose}>
			<div
				className="modal__panel"
				role="dialog"
				aria-modal="true"
				aria-label={title}
				onClick={(e) => e.stopPropagation()}
			>
				<h2>{title}</h2>
				{children}
			</div>
		</div>
	);
};

export default Modal;
