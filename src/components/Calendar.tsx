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
			events={dummyTasks}
			initialView="dayGridMonth"
			height="88vh"
		/>
	);
}

const dummyTasks = [
	{
		title: "R906 Plant watering",
		allDay: true,
		start: "2021-08-07",
		end: "2021-08-07",
		extendedProps: {
			message: "There are 8 plants in total. Use the full bucket of water.",
			complete: false,
			completionTime: "2021-08-07T13:00:00",
			assignedTime: "2021-08-07T11:00:00",
			assignee: "Dara Hensey",
			assigneeUid: "dtdVI82ktJdFH90B1vyH5mkfB6r2",
			assignor: "Aaron Quigley",
			assignorUid: "79TP3KL4Gzd5X0OUfzKb4fkp6423",
		}
	},
];


export default Calendar;
