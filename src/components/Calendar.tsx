import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import { useState, useEffect } from "react";
import { tertiaryMain, textAlt } from "./../util/colours";
import { dummyTasks } from "./../util/tasks";
import "./css/Calendar.css";


function Calendar () {
	const [infoRowIndex, setInfoRowIndex] = useState(99);
	const [buttonClass, setButtonClass] = useState("No button clicked");
	const [buttonClicked, setButtonClicked] = useState(false);

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
			// Find row index of event that was clicked and create row for info below.
			const rows = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
			const rowArray = Array.from(rows);
			const index = rowArray.findIndex((row) => row.textContent.includes(info.event.title));
			const infoRow = table.insertRow(index + 1);
			setInfoRowIndex(index + 1);

			// Attach a class name to the row for future reference.
			const className = document.createAttribute("class");
			className.value = "infoRow";
			infoRow.setAttributeNode(className);

			// Insert cell to display message and make equal to table width.
			const cell = infoRow.insertCell(0);
			const colspan = document.createAttribute("colspan");
			colspan.value = "3";
			cell.setAttributeNode(colspan);
			cell.innerHTML = displayInfo(info);
		}
	}

	// Display the task info. To be inserted into the infoRow cell in eventClicked.
	function displayInfo (info) {
		const infoProps = info.event.extendedProps;

		return (
			`<div>
				<p>Details: ${infoProps.message}</p>
				<p>Assignee(s): ${infoProps.assignees}</p>
				<p>Assignor: ${infoProps.assignor}</p>
				<p>Created: ${infoProps.assignedTime}</p>
				<p>Status: ${infoProps.completionTime ?
				`Task completed at ${infoProps.completionTime}` :
				"Awaiting completion"}</p>
			</div>`
		);
	}

	// Listen for button clicks and save class name to state when clicked.
	useEffect(() => {
		function clickButton (event) {
			setButtonClass(event.target.className);
			setButtonClicked(true);
		}
		const buttons = document.getElementsByClassName("fc-button");
		for (let i = 0; i < buttons.length; i++) {
			buttons[i].addEventListener("click", clickButton);
		}
	}, []);

	// Remove infoRow if navagating away from current view.
	useEffect(() => {
		// Helper function returns true if the button selected is not the current one.
		function newButtonSelected () {
			const activeButton = document.getElementsByClassName("fc-button-active")[0];
			return !(activeButton.className.includes(buttonClass));
		}
		// Remove infoRow if open and using new button.
		if (newButtonSelected() && infoRowIndex !== 99 && buttonClicked) {
			const table = document.getElementsByClassName("fc-list-table")[0] as HTMLTableElement;
			table.deleteRow(infoRowIndex);
			setInfoRowIndex(99);
		}
	}, [buttonClicked, buttonClass, infoRowIndex]);

	return (
		<FullCalendar
			plugins={[ dayGridPlugin, listPlugin ]}
			headerToolbar={{
				start: "prev,next today",
				center: "title",
				end: "calendar dayList,weekList"
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
