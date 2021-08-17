import Modal from "react-modal";
import "./css/TaskModal.css";


function TaskModal (props): JSX.Element {
	Modal.setAppElement("#root");

	return (
		<Modal
			isOpen={props.taskModalVisible}
			onRequestClose={() => props.setTaskModalVisible(false)}
			contentLabel="My dialog"
			className="taskModal"
			overlayClassName="overlay"
		>
			<div>My modal dialog.</div>
			<button onClick={() => props.setTaskModalVisible(false)}>Close modal</button>
		</Modal>
	);
}


export default TaskModal;
