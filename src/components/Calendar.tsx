import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import firebase from "firebase/app";
import { useState, useRef, useEffect, useCallback } from "react";
import { tertiaryMain, textAlt } from "./../util/colours";
import { getTasks, ordinal, isoLocalDate } from "./../util/helpers";
import { API_URL } from "./../util/urls";
import "./css/Calendar.css";


function Calendar (props) {
	const [buttonClicked, setButtonClicked] = useState(false);
	const [tasksFetched, setTasksFetched] = useState(false);
	const infoRowIndexRef = useRef(99);
	let taskId = useRef("");

	const businessId = props.businessId;
	const tasks = props.tasks;
	const role = props.role;
	let infoRowIndex = infoRowIndexRef.current;

	// Event handling for when task is clicked in any view.
	function taskClicked (info) {
		if (info.view.type === "calendar") {
			// Redirect to listview for day that task takes place.
			info.view.calendar.changeView("dayList", info.event.start);
		} else {
			// If in listview, display info below clicked task.
			const table = document.getElementsByClassName("fc-list-table")[0] as HTMLTableElement;
			// Remove previous infoRow if open.
			if (infoRowIndex !== 99) {
				table.deleteRow(infoRowIndex);
			}
			setButtonClicked(false);
			// Track task id for Firestore request.
			taskId = info.event.id;

			// Find row index of task that was clicked.
			const rows = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
			const rowArray = Array.from(rows);
			const index = rowArray.findIndex((row) => {
				const domText = row.textContent;
				const titleMatch = domText.includes(info.event.title);
				function timeMatch () {
					if (info.event.allDay) {
						return domText.includes("all-day");
					} else {
						const start = info.event.start.toLocaleTimeString("en").substring(0, 4);
						const end = info.event.end.toLocaleTimeString("en").substring(0, 4);
						return domText.includes(start) && domText.includes(end);
					}
				}
				return (titleMatch && timeMatch());
			});

			// Create new row for info if task clicked is different to previous task.
			if (index + 1 !== infoRowIndex) {
				const infoRow = table.insertRow(index + 1);
				infoRowIndex = index + 1;

				// Insert cell to display message and make equal to table width.
				const cell = infoRow.insertCell(0);
				const colspan = document.createAttribute("colspan");
				colspan.value = "3";
				cell.setAttributeNode(colspan);
				cell.innerHTML = displayInfo(info);
				document.getElementById("completionButton").addEventListener("click", markTaskComplete);
			} else {
				infoRowIndex = 99;
			}
		}
	}

	// Display the task info. To be inserted into the infoRow cell in taskClicked.
	function displayInfo (info) {
		const infoProps = info.event.extendedProps;

		return (
			`<div class="info" id=${info.event.id}>
				<p><span>Details:</span> ${infoProps.message}</p>
				<p><span>Assignee(s):</span> ${infoProps.assignees}</p>
				<p><span>Assignor:</span> ${infoProps.assignor}</p>
				<p><span>Created:</span> ${formatDate(infoProps.assignedTime)}</p>
				<p><span>Status:</span> ${infoProps.completionTime ?
				`Task completed on ${formatDate(infoProps.completionTime)}` :
				"Awaiting completion"}</p>
				<button id="completionButton">Mark as Complete</button>
			</div>`
		);
	}

	// Takes an ISO 8601 compliant date and formats it nicely.
	function formatDate (compliantDate) {
		const date = new Date(compliantDate);
		const day = ordinal(date.getDate());
		const month = new Intl.DateTimeFormat("en", { month: "long" }).format(date);
		const hours = date.getHours();
		const unformattedMins = date.getMinutes();
		const minutes = unformattedMins < 10 ? "0" + unformattedMins : unformattedMins;
		return `${month} ${day} at ${hours}:${minutes}`;
	}

	// Opens a modal so the user can input information and create task.
	function addTask () {
		props.setTaskModalVisible(true);
	}

	// Sends task completion timestamp to Firestore.
	async function markTaskComplete () {
		const completionTime = isoLocalDate(new Date());
		try {
			const token = await firebase.auth().currentUser.getIdToken(true);
			const requestOptions = {
				method: "PUT",
				headers: { authorization: `Bearer ${token}` },
				body: completionTime
			};
			const res = await fetch(`${API_URL}/tasks/${taskId}/${businessId}`, requestOptions);
			const data = await res.json();
			console.log(data);
		} catch (error) {
			console.error(`POST request to /tasks failed: ${error}`);
		}
	}

	// Get all tasks and save to state in parent.
	const fetchTasks = useCallback(
		async () => {
			const newTasks = await getTasks(role, businessId, props.userId);
			props.setTasks(newTasks);
		}, [role, businessId, props]
	);

	// Set listeners for clicks on all buttons on initial render.
	useEffect(() => {
		const buttons = document.getElementsByClassName("fc-button");
		for (let i = 0; i < buttons.length; i++) {
			buttons[i].addEventListener("click", () => setButtonClicked(true));
		}
	}, []);

	// Remove infoRow if open and using a button.
	useEffect(() => {
		if (infoRowIndex !== 99 && buttonClicked) {
			const table = document.getElementsByClassName("fc-list-table")[0] as HTMLTableElement;
			table.deleteRow(infoRowIndex);
			// eslint-disable-next-line react-hooks/exhaustive-deps
			infoRowIndex = 99;
		}
	}, [infoRowIndex, buttonClicked]);

	// Fetch tasks from Firestore on first render.
	useEffect(() => {
		if (!tasksFetched) {
			setTasksFetched(true);
			fetchTasks();
		}
	}, [tasksFetched, fetchTasks]);

	return (
		<FullCalendar
			plugins={[ dayGridPlugin, listPlugin ]}
			headerToolbar={{
				// Do not render addTask button for staff user.
				start: `prev,next today${role === "staff" ? "" : " addTask"}`,
				center: "title",
				end: "calendar dayList,weekList",
			}}
			customButtons={{
				addTask: {
					text: "+",
					click: addTask,
				}
			}}
			views={{
				calendar: {
					type: "dayGridMonth",
					buttonText: "Calendar",
					eventTimeFormat: {
						hour: "2-digit",
						minute: "2-digit",
						meridiem: false,
						hour12: false,
					},
				},
				dayList: {
					type: "listDay",
					buttonText: "Day",
				},
				weekList: {
					type: "listWeek",
					buttonText: "Week",
				},
			}}
			initialView="calendar"
			fixedWeekCount={false}
			firstDay={1}
			events={tasks}
			eventColor={tertiaryMain}
			eventTextColor={textAlt}
			dayMaxEventRows={4}
			eventClick={taskClicked}
		/>
	);
}


export default Calendar;
