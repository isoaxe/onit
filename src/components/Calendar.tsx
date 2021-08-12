import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import { useState } from "react";
import { tertiaryMain, textAlt } from "./../util/colours";
import { dummyTasks } from "./../util/tasks";
import "./css/Calendar.css";


function Calendar () {
	const [infoRowIndex, setInfoRowIndex] = useState(99);

	function eventClicked (info) {
		if (info.view.type === "calendar") {
			// Redirect to listview for day that event takes place.
			info.view.calendar.changeView("dayList", info.event.start);
		} else {
			// Find listview row (event) that was clicked and insert row below.
			const table = document.getElementsByClassName("fc-list-table")[0] as HTMLTableElement;
			// Remove previous infoRow if open.
			if (infoRowIndex !== 99) {
				table.deleteRow(infoRowIndex);
			}
			const rows = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
			const rowArray = Array.from(rows);
			const index = rowArray.findIndex((row) => row.textContent.includes(info.event.title));
			const newRow = table.insertRow(index + 1);
			setInfoRowIndex(index + 1);

			// Insert cell to display message and make equal to table width.
			const cell = newRow.insertCell(0);
			const colspan = document.createAttribute("colspan");
			colspan.value = "3";
			cell.setAttributeNode(colspan);
			cell.innerHTML = displayInfo(info);
		}
	}

	// TODO: Make the displayInfo object here and insert into cell above.
	function displayInfo (info) {
		return (
			`<div>
				<p>Details: ${info.event.extendedProps.message}</p>
			</div>`
		);
	}

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
			initialView="dayGridMonth"
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
