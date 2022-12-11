import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { TextField } from "@mui/material";
import { StyleSheet } from "../util/types";
import "react-datepicker/dist/react-datepicker.css";
import "./css/DateSelect.css";

function DateSelect(props): JSX.Element {
  const [hoursHelperText, setHoursHelperText] = useState("");
  const [minsHelperText, setMinsHelperText] = useState("");

  const { startDate, handleStartDate, allDay } = props;
  const { durationHours, durationMinutes, setDurationHours } = props;
  const { setDurationMinutes, setDurationValid } = props;

  function handleTime(event, setTimeHelperText, setTime) {
    const time = event.currentTarget.value;
    const numCheck = time * 1; // Coalesce to number or NaN.
    if (isNaN(numCheck)) {
      setTimeHelperText("Only num");
    } else if (time < 0) {
      setTimeHelperText("Too low");
    } else if (time > 59) {
      setTimeHelperText("Too high");
    } else {
      setTimeHelperText("");
    }
    setTime(time);
  }

  function handleHours(event) {
    handleTime(event, setHoursHelperText, setDurationHours);
  }

  function handleMinutes(event) {
    handleTime(event, setMinsHelperText, setDurationMinutes);
  }

  useEffect(() => {
    if (allDay) {
      setDurationValid(true); // Don't validate duration if task is all day.
    } else if (hoursHelperText || minsHelperText) {
      setDurationValid(false); // Invalid if helper text (i.e. errors) present.
    } else if (durationHours && durationMinutes) {
      setDurationValid(true); // Only valid when no errors and both duration fields populated.
    } else {
      setDurationValid(false); // Default to invalid.
    }
  }, [
    allDay,
    durationHours,
    durationMinutes,
    hoursHelperText,
    minsHelperText,
    setDurationValid,
  ]);

  if (allDay) {
    return (
      <div className="datepicker-duration-wrapper">
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
      <div className="datepicker-duration-wrapper">
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

export default DateSelect;

const styles: StyleSheet = {
  durationField: {
    width: "35%",
    margin: "5px 0px 15px",
  },
};
