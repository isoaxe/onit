import DatePicker from "react-datepicker";
import { TextField } from "@mui/material";
import { StyleSheet } from "./../util/types";
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
          <TextField
            label="Hours"
            type="number"
            size="small"
            value={durationHours}
            onChange={handleHours}
            sx={styles.durationField}
          />
          <TextField
            label="Minutes"
            type="number"
            size="small"
            value={durationMinutes}
            onChange={handleMinutes}
            sx={styles.durationField}
          />
        </div>
      </div>
    );
  }
}

const styles: StyleSheet = {
  durationField: {
    width: "85px",
    margin: "5px 0px 15px",
  },
};

export default DateSelect;
