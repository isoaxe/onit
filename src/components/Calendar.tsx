import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";


function Calendar () {
	return (
		<FullCalendar
			plugins={[ dayGridPlugin, listPlugin ]}
			headerToolbar={{
				start: "prev,next today",
				center: "title",
				end: "dayGridMonth listDay,listWeek,listMonth"
			}}
			initialView="dayGridMonth"
			height="88vh"
		/>
	);
}


export default Calendar;
