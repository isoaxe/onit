import { useState, ChangeEvent } from "react";
import Modal from "react-modal";
import "./css/TaskModal.css";


function TaskModal (props): JSX.Element {
	const [title, setTitle] = useState("");
	const [message, setMessage] = useState("");
	Modal.setAppElement("#root");

	function handleTitle (event: ChangeEvent<HTMLInputElement>): void {
		setTitle(event.currentTarget.value);
	}

	function handleMessage (event: ChangeEvent<HTMLTextAreaElement>): void {
		setMessage(event.currentTarget.value);
	}

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
			<div>
				<header>Add Task</header>
				<form className="form">
					<input value={title} onChange={handleTitle} type="text" placeholder="Title" name="title" />
					<textarea value={message} onChange={handleMessage} placeholder="Message" name="message" rows={4} />
				</form>
				<button onClick={close}>Close Modal</button>
			</div>
		</Modal>
	);
}


export default TaskModal;
