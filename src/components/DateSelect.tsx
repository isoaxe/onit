import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./css/TaskModal.css";


function DateSelect (props): JSX.Element {

	return (
		<DatePicker selected={props.startDate} onChange={props.handleStartDate} showTimeSelect dateFormat="dd/MM/yyyy - HH:mm" />
	);
}


export default DateSelect;
