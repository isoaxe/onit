import { useState, useEffect, useCallback, ChangeEvent } from "react";
import firebase from "firebase/app";
import Modal from "react-modal";
import Switch from "react-switch";
import Select from "react-select";
import DateSelect from "./DateSelect";
import { API_URL } from "./../util/urls";
import "react-datepicker/dist/react-datepicker.css";
import "./css/TaskModal.css";
import { postFormDataAsJson, getId } from "./../util/helpers";
import { textAlt } from "./../util/colours";


function TaskModal (props): JSX.Element {
	const [title, setTitle] = useState("");
	const [message, setMessage] = useState("");
	const [allDay, setAllDay] = useState(false);
	const [startDate, setStartDate] = useState(new Date());
	const [assignees, setAssignees] = useState([]);
	const [users, setUsers] = useState(null);
	const [durationHours, setDurationHours] = useState(0);
	const [durationMinutes, setDurationMinutes] = useState(0);
	const [duration, setDuration] = useState("01:00");

	const businessId = props.businessId;
	const formattedAssignees = assignees.map(assignee => assignee.value).toString();
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

	function handleSelect (selectedOption) {
		setAssignees(selectedOption);
	}

	function close () {
		props.setTaskModalVisible(false);
	}

	// Get the supplied date as a ISO string with local time.
	function formattedDate (date) {
		const epochLocalTime = date.getTime() - date.getTimezoneOffset()*60*1000;
		const localIsoDate = new Date(epochLocalTime).toISOString().substring(0, 19);
		if (allDay) {
			return localIsoDate.split("T")[0];
		} else {
			return localIsoDate;
		}
	}

	function getEndDate () {
		if (allDay) {
			return formattedDate(startDate); // Since startDate === endDate.
		} else {
			const epochEndDate = startDate.getTime() + 6*60*60*1000; // Add 6 hours.
			const endDate = new Date(epochEndDate);
			return formattedDate(endDate);
		}
	}

	async function createTask (event) {
		event.preventDefault();
		const taskId = getId(); // Randomly generated id.
		const url = `${API_URL}/tasks/${taskId}/${businessId}`;
		const form = event.currentTarget;

		try {
			const formData = new FormData(form);
			formData.append("assignees", formattedAssignees);
			formData.append("allDay", allDay.toString());
			formData.append("start", formattedDate(startDate));
			formData.append("end", getEndDate());
			formData.append("timeOffset", startDate.toString().substring(25, 33));
			await postFormDataAsJson({ url, formData });
		} catch (err) {
			console.error(err);
		}
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
				const formattedUsers = [];
				for (let i = 0; i < filteredUsers.length; i++) {
					const value = filteredUsers[i].displayName + " " + filteredUsers[i].lastName;
					const label = value;
					const formattedUser = { value: value, label: label };
					formattedUsers.push(formattedUser);
				}
				setUsers(formattedUsers);
				return formattedUsers;
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
				<form className="form" onSubmit={createTask}>
					<input value={title} onChange={handleTitle} type="text" placeholder="Title" name="title" />
					<textarea value={message} onChange={handleMessage} placeholder="Message" name="message" rows={4} />
					<label className="all-day-container">
						<span>All Day</span>
						<Switch onChange={handleAllDay} checked={allDay} height={22} width={44} />
					</label>
					<DateSelect startDate={startDate} handleStartDate={handleStartDate} allDay={allDay} setDuration={setDuration} durationHours={durationHours} durationMinutes={durationMinutes} setDurationHours={setDurationHours} setDurationMinutes={setDurationMinutes} />
					<header className="staff-text">Assign Staff</header>
					<Select className="dropdown" options={users} styles={selectorStyles} isMulti={true} width={200} onChange={handleSelect} />
					<button type="submit">Create Task</button>
				</form>
			</div>
		</Modal>
	);
}

const selectorStyles = {
	option: (provided) => ({
		...provided,
		color: textAlt,
		padding: 5,
		fontSize: 13,
	}),
	control: (provided) => ({
		...provided,
		border: 0,
		width: 188,
	}),
	singleValue: (provided) => ({
		...provided,
		fontSize: 13,
	}),
};


export default TaskModal;
