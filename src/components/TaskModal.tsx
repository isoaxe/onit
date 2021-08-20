import Modal from "react-modal";
import "./css/TaskModal.css";


function TaskModal (props): JSX.Element {
	Modal.setAppElement("#root");

	return (
		<Modal
			isOpen={props.taskModalVisible}
			onRequestClose={() => props.setTaskModalVisible(false)}
			contentLabel="Task Modal"
			className="content"
			overlayClassName="overlay"
		>
			<div className="wrapper">
				<div>Some Modal Text</div>
				<button onClick={() => props.setTaskModalVisible(false)}>Close Modal</button>
			</div>
		</Modal>
	);
}


export default TaskModal;
