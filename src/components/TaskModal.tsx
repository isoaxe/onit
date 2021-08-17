import Modal from "react-modal";
import "./css/TaskModal.css";


function TaskModal (props): JSX.Element {
	Modal.setAppElement("#root");

	return (
		<Modal
			isOpen={props.taskModalVisible}
			onRequestClose={() => props.setTaskModalVisible(false)}
			contentLabel="Task Modal"
			className="taskModal"
			overlayClassName="overlay"
		>
			<div className={"wrapper"}>
				<div>My modal dialog.</div>
				<button onClick={() => props.setTaskModalVisible(false)}>Close modal</button>
			</div>
		</Modal>
	);
}


export default TaskModal;
