import { useState, ChangeEvent } from "react";
import Modal from "react-modal";
import Switch from "react-switch";
import DateSelect from "./DateSelect";
import "react-datepicker/dist/react-datepicker.css";
import "./css/TaskModal.css";


function TaskModal (props): JSX.Element {
	const [title, setTitle] = useState("");
	const [message, setMessage] = useState("");
	const [allDay, setAllDay] = useState(false);
	const [startDate, setStartDate] = useState(new Date());
	Modal.setAppElement("#root");

	function handleTitle (event: ChangeEvent<HTMLInputElement>): void {
		setTitle(event.currentTarget.value);
	}

	function handleMessage (event: ChangeEvent<HTMLTextAreaElement>): void {
		setMessage(event.currentTarget.value);
	}

	function handleAllDay (toggle: boolean): void {
		setAllDay(toggle);
	}

	function handleStartDate (date) {
		setStartDate(date);
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
				<header className="header-text">Add Task</header>
				<form className="form">
					<input value={title} onChange={handleTitle} type="text" placeholder="Title" name="title" />
					<textarea value={message} onChange={handleMessage} placeholder="Message" name="message" rows={4} />
					<label className="all-day-container">
						<span>All Day</span>
						<Switch onChange={handleAllDay} checked={allDay} height={22} width={44} />
					</label>
					<DateSelect startDate={startDate} handleStartDate={handleStartDate} allDay={allDay} />
				</form>
				<button onClick={close}>Close Modal</button>
			</div>
		</Modal>
	);
}


export default TaskModal;
