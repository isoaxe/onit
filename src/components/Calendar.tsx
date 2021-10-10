import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import { useState, useEffect, useCallback } from "react";
import firebase from "firebase/app";
import { tertiaryMain, textAlt } from "./../util/colours";
import { API_URL } from "./../util/urls";
import { dummyTasks } from "./../util/tasks";
import { ordinal } from "./../util/helpers";
import "./css/Calendar.css";


function Calendar (props) {
	const [infoRowIndex, setInfoRowIndex] = useState(99);
	const [buttonClicked, setButtonClicked] = useState(false);
	const [tasks, setTasks] = useState([]);

	const businessId = props.businessId;

	// Event handling for when task is clicked in any view.
	function eventClicked (info) {
		if (info.view.type === "calendar") {
			// Redirect to listview for day that event takes place.
			info.view.calendar.changeView("dayList", info.event.start);
		} else {
			// If in listview, display info below clicked task.
			const table = document.getElementsByClassName("fc-list-table")[0] as HTMLTableElement;
			// Remove previous infoRow if open.
			if (infoRowIndex !== 99) {
				table.deleteRow(infoRowIndex);
			}
			setButtonClicked(false);

			// Find row index of event that was clicked.
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

			// Create new row for info if event clicked is different to previous event.
			if (index + 1 !== infoRowIndex) {
				const infoRow = table.insertRow(index + 1);
				setInfoRowIndex(index + 1);

				// Insert cell to display message and make equal to table width.
				const cell = infoRow.insertCell(0);
				const colspan = document.createAttribute("colspan");
				colspan.value = "3";
				cell.setAttributeNode(colspan);
				cell.innerHTML = displayInfo(info);
			} else {
				setInfoRowIndex(99);
			}
		}
	}

	// Display the task info. To be inserted into the infoRow cell in eventClicked.
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

	// Opens a modal so the user can input information and create event.
	function addEvent () {
		props.setTaskModalVisible(true);
	}

	const getTasks = useCallback(
		async () => {
			try {
				const token = await firebase.auth().currentUser.getIdToken(true);
				const requestOptions = {
					method: "GET",
					headers: { authorization: `Bearer ${token}` }
				};
				const res = await fetch(`${API_URL}/tasks/${businessId}`, requestOptions);
				const taskArray = await res.json();
				setTasks(taskArray);
			} catch (error) {
				console.error(`GET request to /tasks failed: ${error}`);
			}
		}, [businessId]
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
			setInfoRowIndex(99);
		}
	}, [infoRowIndex, buttonClicked]);

	// Fetch tasks from Firestore.
	useEffect(() => {
		getTasks();
	}, [getTasks]);

	return (
		<FullCalendar
			plugins={[ dayGridPlugin, listPlugin ]}
			headerToolbar={{
				start: "prev,next today addEvent",
				center: "title",
				end: "calendar dayList,weekList",
			}}
			customButtons={{
				addEvent: {
					text: "+",
					click: addEvent,
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
			events={dummyTasks}
			eventColor={tertiaryMain}
			eventTextColor={textAlt}
			dayMaxEventRows={4}
			eventClick={eventClicked}
		/>
	);
}


export default Calendar;
