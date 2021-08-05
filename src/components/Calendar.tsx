import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import { dummyTasks } from "./../util/tasks";


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
				},
				dayList: {
					type: "listDay",
					buttonText: "List Day",
				},
				weekList: {
					type: "listWeek",
					buttonText: "List Week",
				},
			}}
			events={dummyTasks}
			initialView="dayGridMonth"
			height="88vh"
		/>
	);
}


export default Calendar;
