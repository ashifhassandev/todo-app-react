import { useEffect } from "react";

const AlertMessage = ({ type, message, onClose }) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			onClose();
		}, 3000);

		return () => clearTimeout(timer);
	}, [onClose]);

	const alertTypeClass = {
		success: "alert-success",
		error: "alert-error",
		warning: "alert-warning",
		info: "alert-info",
	};

	return (
		<div className={`alert-message ${alertTypeClass[type]}`}>
			<p>{message}</p>
		</div>
	);
};

export default AlertMessage;