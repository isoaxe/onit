import Modal from "react-modal";
import "./css/TaskModal.css";


function TaskModal (props): JSX.Element {
	Modal.setAppElement("#root");

	function close () {
		props.setTaskModalVisible(false);
	}

	return (
		<Modal
			isOpen={props.taskModalVisible}
			onRequestClose={close}
			contentLabel="Task Modal"
			className="content"
			overlayClassName="overlay"
		>
			<div className="wrapper">
				<div>Some Modal Text</div>
				<button onClick={close}>Close Modal</button>
			</div>
		</Modal>
	);
}


export default TaskModal;
