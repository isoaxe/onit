import { useState } from "react";
import DatePicker from "react-datepicker";
import { TextField } from "@mui/material";
import { StyleSheet } from "./../util/types";
import "react-datepicker/dist/react-datepicker.css";
import "./css/DateSelect.css";

function DateSelect(props): JSX.Element {
  const [hoursHelperText, setHoursHelperText] = useState("");
  const [minsHelperText, setMinsHelperText] = useState("");

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
    const hours = event.currentTarget.value;
    const numCheck = hours * 1; // Coalesce to number or NaN.
    if (isNaN(numCheck)) {
      setHoursHelperText("Only num");
    } else if (hours < 0) {
      setHoursHelperText("Too low");
    } else if (hours > 100) {
      setHoursHelperText("Too high");
    } else {
      setHoursHelperText("");
    }
    setDurationHours(hours);
  }

  function handleMinutes(event) {
    const minutes = event.currentTarget.value;
    const numCheck = minutes * 1; // Coalesce to number or NaN.
    if (isNaN(numCheck)) {
      setMinsHelperText("Only num");
    } else if (minutes < 0) {
      setMinsHelperText("Too low");
    } else if (minutes > 59) {
      setMinsHelperText("Too high");
    } else {
      setMinsHelperText("");
    }
    setDurationMinutes(minutes);
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
            type="text"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            size="small"
            value={durationHours}
            onChange={handleHours}
            error={!!hoursHelperText}
            helperText={hoursHelperText}
            sx={styles.durationField}
          />
          <TextField
            label="Minutes"
            type="text"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            size="small"
            value={durationMinutes}
            onChange={handleMinutes}
            error={!!minsHelperText}
            helperText={minsHelperText}
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
