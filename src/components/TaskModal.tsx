import { useState, useEffect, useCallback, ChangeEvent } from "react";
import firebase from "firebase/app";
import Modal from "react-modal";
import Switch from "react-switch";
import { TextField } from "@mui/material";
import DateSelect from "./DateSelect";
import StaffSelect from "./StaffSelect";
import { useAuth } from "./../util/useAuth";
import { API_URL } from "./../util/urls";
import { StyleSheet } from "./../util/types";
import {
  postFormDataAsJson,
  getId,
  getTasks,
  isoLocalDate,
} from "./../util/helpers";
import "react-datepicker/dist/react-datepicker.css";
import "./css/TaskModal.css";

function TaskModal(props): JSX.Element {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [allDay, setAllDay] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [assignees, setAssignees] = useState([]);
  const [users, setUsers] = useState(null);
  const [durationHours, setDurationHours] = useState(null);
  const [durationMinutes, setDurationMinutes] = useState(null);

  const { user } = useAuth();
  const businessId = props.businessId;
  const role = props.role;
  const formattedAssignees = assignees
    .map((assignee) => assignee.fullName)
    .toString();
  const formattedAssigneeUids = assignees
    .map((assignee) => assignee.uid)
    .toString();
  Modal.setAppElement("#root");

  function handleTitle(event: ChangeEvent<HTMLInputElement>): void {
    setTitle(event.currentTarget.value);
  }

  function handleMessage(event: ChangeEvent<HTMLTextAreaElement>): void {
    setMessage(event.currentTarget.value);
  }

  function handleAllDay(toggle: boolean): void {
    setAllDay(toggle);
  }

  function handleStartDate(date) {
    setStartDate(date);
  }

  function handleSelect(selectedOption) {
    setAssignees(selectedOption);
  }

  function close() {
    props.setTaskModalVisible(false);
  }

  // Remove time from date string if task is all day.
  function removeTimeIfAllDay(isoLocalDate: string) {
    if (allDay) {
      return isoLocalDate.split("T")[0];
    } else {
      return isoLocalDate;
    }
  }

  function getEndDate() {
    let endDate = new Date();
    // If allDay, set end to following day for overdue to work properly.
    if (allDay) {
      endDate.setDate(endDate.getDate() + 1);
      return isoLocalDate(endDate);
    } else {
      const epochEndDate =
        startDate.getTime() +
        durationHours * 60 * 60 * 1000 +
        durationMinutes * 60 * 1000;
      endDate = new Date(epochEndDate);
      return isoLocalDate(endDate);
    }
  }

  function getFullName() {
    if (role === "owner") {
      return user.displayName;
    } else {
      const currentUser = users.find((person) => person.uid === user.uid);
      return currentUser.value;
    }
  }

  // Reset all state variables on form modal.
  function clearData() {
    setTitle("");
    setMessage("");
    setAllDay(false);
    setStartDate(new Date());
    setAssignees([]);
    setUsers(null);
    setDurationHours(0);
    setDurationMinutes(0);
  }

  async function createTask(event) {
    event.preventDefault();
    const taskId = getId(); // Randomly generated id.
    const url = `${API_URL}/tasks/${taskId}/${businessId}`;
    const form = event.currentTarget;

    try {
      const formData = new FormData(form);
      formData.append("assignees", formattedAssignees);
      formData.append("allDay", allDay.toString());
      formData.append("start", removeTimeIfAllDay(isoLocalDate(startDate)));
      formData.append("end", removeTimeIfAllDay(getEndDate()));
      formData.append("timeOffset", startDate.toString().substring(25, 33));
      formData.append("assignedTime", isoLocalDate(new Date()));
      formData.append("assigneeUids", formattedAssigneeUids);
      formData.append("assignor", getFullName());
      formData.append("assignorUid", user.uid);
      await postFormDataAsJson({ url, formData });
      clearData();
      close();
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  }

  const getUsers = useCallback(async () => {
    try {
      const token = await firebase.auth().currentUser.getIdToken(true);
      const requestOptions = {
        method: "GET",
        headers: { authorization: `Bearer ${token}` },
      };
      const res = await fetch(`${API_URL}/user/${businessId}`, requestOptions);
      const userArray = await res.json();
      // If user array has not been fetched, do not operate.
      if (userArray.error) {
        return false;
      }
      const filteredUsers = userArray.filter((arr) => arr.role !== "owner");
      const formattedUsers = [];
      for (let i = 0; i < filteredUsers.length; i++) {
        const fullName =
          filteredUsers[i].displayName + " " + filteredUsers[i].lastName;
        const uid = filteredUsers[i].uid;
        const formattedUser = { fullName, uid };
        formattedUsers.push(formattedUser);
      }
      setUsers(formattedUsers);
      return formattedUsers;
    } catch (error) {
      console.error(`GET request to /user failed: ${error}`);
    }
  }, [businessId]);

  const fetchTasks = useCallback(async () => {
    const newTasks = await getTasks(role, businessId, props.userId);
    props.setTasks(newTasks);
  }, [role, businessId, props]);

  useEffect(() => {
    if (businessId) getUsers();
  }, [businessId, getUsers]);

  return (
    <Modal
      isOpen={props.taskModalVisible}
      onRequestClose={close}
      contentLabel="Task Modal"
      className="content"
      overlayClassName="overlay"
    >
      <div>
        <header className="header-text">Add Task</header>
        <form className="form" onSubmit={createTask}>
          <TextField
            label="Title"
            value={title}
            onChange={handleTitle}
            sx={styles.title}
          />
          <TextField
            label="Message"
            value={message}
            onChange={handleMessage}
            multiline
            minRows={2}
            maxRows={4}
            sx={styles.message}
          />
          <label className="all-day-container">
            <span>All Day</span>
            <Switch
              onChange={handleAllDay}
              checked={allDay}
              height={22}
              width={44}
            />
          </label>
          <DateSelect
            startDate={startDate}
            handleStartDate={handleStartDate}
            allDay={allDay}
            durationHours={durationHours}
            durationMinutes={durationMinutes}
            setDurationHours={setDurationHours}
            setDurationMinutes={setDurationMinutes}
          />
          <StaffSelect
            staff={users}
            selectedStaff={assignees}
            onSelect={handleSelect}
          />
          <button type="submit">Create Task</button>
        </form>
      </div>
    </Modal>
  );
}

const styles: StyleSheet = {
  title: {
    marginBottom: "15px",
  },
  message: {
    marginBottom: "15px",
    width: "93%",
  },
};

export default TaskModal;
