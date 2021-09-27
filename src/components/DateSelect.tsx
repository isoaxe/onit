import { useState, useEffect } from "react";
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

	// Returns task duration in HH:MM format.
	function getDuration () {
		let hourString = hours.toString();
		let minuteString = minutes.toString();
		if (parseInt(hours) < 10) {
			hourString = "0" + hourString;
		}
		if (parseInt(minutes) < 10) {
			minuteString = "0" + minuteString;
		}
		return hourString + ":" + minuteString;
	}

	useEffect(() => {
		props.setDuration(getDuration);
	});

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
					<input className="time-input" value={hours} onChange={handleHours} type="number" placeholder="Hrs" name="hours" min="0" max="99" />
					<input className="time-input" value={minutes} onChange={handleMinutes} type="number" placeholder="Mins" name="minutes" min="0" max="59" />
				</div>
			</div>
		);
	}
}


export default DateSelect;
