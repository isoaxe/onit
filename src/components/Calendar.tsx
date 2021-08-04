import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";


function Calendar () {
	return (
		<FullCalendar
			plugins={[ dayGridPlugin, listPlugin ]}
			initialView="dayGridMonth"
		/>
	);
}


export default Calendar;
