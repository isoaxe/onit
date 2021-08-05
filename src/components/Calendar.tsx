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
			events={dummyEvents}
			initialView="dayGridMonth"
			height="88vh"
		/>
	);
}

const dummyEvents = [
	{
		title: "R906 Plant watering",
		start: "2021-08-07",
		end: "2021-08-08",
	}
];


export default Calendar;
