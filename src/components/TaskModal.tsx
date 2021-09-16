import { useState, useEffect, useCallback, ChangeEvent } from "react";
import firebase from "firebase/app";
import Modal from "react-modal";
import Switch from "react-switch";
import Select from "react-select";
import DateSelect from "./DateSelect";
import { API_URL } from "./../util/urls";
import "react-datepicker/dist/react-datepicker.css";
import "./css/TaskModal.css";


function TaskModal (props): JSX.Element {
	const [title, setTitle] = useState("");
	const [message, setMessage] = useState("");
	const [allDay, setAllDay] = useState(false);
	const [startDate, setStartDate] = useState(new Date());
	const [users, setUsers] = useState(null);
	const businessId = props.businessId;
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

	const getUsers = useCallback(
		async () => {
			try {
				const token = await firebase.auth().currentUser.getIdToken(true);
				const requestOptions = {
					method: "GET",
					headers: { authorization: `Bearer ${token}` }
				};
				const res = await fetch(`${API_URL}/user/${businessId}`, requestOptions);
				const userArray = await res.json();
				const filteredUsers = userArray.filter(arr => arr.role !== "owner");
				setUsers(filteredUsers);
				return filteredUsers;
			} catch (error) {
				console.error(`GET request to /user failed: ${error}`);
			}
		}, [businessId]
	);

	useEffect(() => {
		if (businessId) getUsers();
	}, [businessId, getUsers]);

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
					<header>Select Staff for Task</header>
					<Select />
				</form>
				<button onClick={close}>Close Modal</button>
			</div>
		</Modal>
	);
}


export default TaskModal;
