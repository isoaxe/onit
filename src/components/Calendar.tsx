import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import { tertiaryMain, textAlt } from "./../util/colours";
import { dummyTasks } from "./../util/tasks";
import "./css/Calendar.css";


function Calendar () {

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
			eventClick={(info) => {
				if (info.view.type === "calendar") {
					// Redirect to listview for day that event takes place.
					info.view.calendar.changeView("dayList", info.event.start);
				} else {
					// Find listview row (event) that was clicked and display message below.
					const table = document.getElementsByClassName("fc-list-table")[0] as HTMLTableElement;
					const rows = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
					const rowArray = Array.from(rows);
					const index = rowArray.findIndex((row) => row.textContent.includes(info.event.title));
					const displayInfo = table.insertRow(index + 1);
					displayInfo.innerHTML = "A temporary message testing this feature";
				}
			}}
		/>
	);
}


export default Calendar;
