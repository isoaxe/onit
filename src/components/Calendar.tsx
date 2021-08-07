import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import { tertiaryLight, textAlt } from "./../util/colours";
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
			events={dummyTasks}
			initialView="dayGridMonth"
			height="88vh"
			fixedWeekCount={false}
			firstDay={1}
			eventColor={tertiaryLight}
			eventTextColor={textAlt}
			dayMaxEventRows={4}
		/>
	);
}


export default Calendar;
