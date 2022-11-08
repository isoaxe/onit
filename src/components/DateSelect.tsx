import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./css/DateSelect.css";

function DateSelect(props): JSX.Element {
  function handleHours(event) {
    props.setDurationHours(event.currentTarget.value);
  }

  function handleMinutes(event) {
    props.setDurationMinutes(event.currentTarget.value);
  }

  if (props.allDay) {
    return (
      <div>
        <header>Select Task Day</header>
        <DatePicker
          selected={props.startDate}
          onChange={props.handleStartDate}
          dateFormat="dd/MM/yyyy"
        />
      </div>
    );
  } else {
    return (
      <div>
        <header>Select Task Day and Time</header>
        <DatePicker
          selected={props.startDate}
          onChange={props.handleStartDate}
          showTimeSelect
          dateFormat="dd/MM/yyyy - HH:mm"
        />
        <header>Duration</header>
        <div className="duration">
          <input
            className="time-input"
            value={props.durationHours}
            onChange={handleHours}
            type="number"
            name="hours"
            min="0"
            max="99"
          />
          <p className="time-text">Hours</p>
          <input
            className="time-input"
            value={props.durationMinutes}
            onChange={handleMinutes}
            type="number"
            name="minutes"
            min="0"
            max="59"
          />
          <p className="time-text">Mins</p>
        </div>
      </div>
    );
  }
}

export default DateSelect;
