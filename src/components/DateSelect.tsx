import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./css/DateSelect.css";


function DateSelect (props): JSX.Element {
	const [hours, setHours] = useState("");
	const [minutes, setMinutes] = useState("");

	function handleHours (event) {
		setHours(event.currentTarget.value);
	}

	function handleMinutes (event) {
		setMinutes(event.currentTarget.value);
	}

	if (props.allDay) {
		return (
			<div>
				<header>Select Task Day</header>
				<DatePicker selected={props.startDate} onChange={props.handleStartDate} dateFormat="dd/MM/yyyy" />
			</div>
		);
	} else {
		return (
			<div>
				<header>Select Task Day and Time</header>
				<DatePicker selected={props.startDate} onChange={props.handleStartDate} showTimeSelect dateFormat="dd/MM/yyyy - HH:mm" />
				<div className="duration">
					<header>Duration:</header>
					<input value={hours} onChange={handleHours} type="number" placeholder="Hours" name="hours" min="0" max="99" />
					<input value={minutes} onChange={handleMinutes} type="number" placeholder="Minutes" name="minutes" min="0" max="59" />
				</div>
			</div>
		);
	}
}


export default DateSelect;
