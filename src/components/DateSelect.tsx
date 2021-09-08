import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./css/DateSelect.css";


function DateSelect (props): JSX.Element {

	return (
		<div>
			<header>Select Task Day and Time</header>
			<DatePicker selected={props.startDate} onChange={props.handleStartDate} showTimeSelect dateFormat="dd/MM/yyyy - HH:mm" />
		</div>
	);
}


export default DateSelect;
