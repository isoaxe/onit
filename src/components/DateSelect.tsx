import DatePicker from "react-datepicker";
import { TextField } from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import "./css/DateSelect.css";

function DateSelect(props): JSX.Element {
  const {
    startDate,
    handleStartDate,
    allDay,
    durationHours,
    durationMinutes,
    setDurationHours,
    setDurationMinutes,
  } = props;

  function handleHours(event) {
    setDurationHours(event.currentTarget.value);
  }

  function handleMinutes(event) {
    setDurationMinutes(event.currentTarget.value);
  }

  if (allDay) {
    return (
      <div>
        <header>Select Task Day</header>
        <DatePicker
          selected={startDate}
          onChange={handleStartDate}
          dateFormat="dd/MM/yyyy"
        />
      </div>
    );
  } else {
    return (
      <div>
        <header>Select Task Day and Time</header>
        <DatePicker
          selected={startDate}
          onChange={handleStartDate}
          showTimeSelect
          dateFormat="dd/MM/yyyy - HH:mm"
        />
        <header>Duration</header>
        <div className="duration">
          <input
            className="time-input"
            value={durationHours}
            onChange={handleHours}
            type="number"
            name="hours"
            min="0"
            max="99"
          />
          <p className="time-text">Hours</p>
          <TextField
            label="Hours"
            type="number"
            size="small"
            value={durationHours}
            onChange={handleHours}
          />
          <input
            className="time-input"
            value={durationMinutes}
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
