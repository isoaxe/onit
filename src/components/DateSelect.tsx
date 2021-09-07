import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./css/TaskModal.css";


function DateSelect (props): JSX.Element {

	return (
		<DatePicker selected={props.startDate} onChange={(date) => props.setStartDate(date)} showTimeSelect dateFormat="dd/MM/yyyy - HH:mm" />
	);
}


export default DateSelect;
