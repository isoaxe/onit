import { useState, useEffect } from "react";
import UserTable from "./UserTable";
import { API_URL } from "../util/urls";
import { textMain } from "../util/colours";
import { auth } from "../util/firebase";
import { StyleSheet } from "../util/types";

function People(props): JSX.Element {
  const [users, setUsers] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { businessId, role } = props;

  async function getUsers() {
    try {
      const token = await auth.currentUser.getIdToken(true);
      const requestOptions = {
        method: "GET",
        headers: { authorization: `Bearer ${token}` },
      };
      const res = await fetch(`${API_URL}/user/${businessId}`, requestOptions);
      const data = await res.json();
      // If user data has not been fetched, do not save to state.
      if (data.error) {
        console.error(data.error);
        setErrorMessage(data.error);
        return false;
      }
      setUsers(data);
      setRefresh(false);
      return data;
    } catch (error) {
      console.error(`GET request to /user failed: ${error}`);
    }
  }

  function forceRefresh() {
    setRefresh(true);
  }

  useEffect(() => {
    if (!users || refresh) {
      getUsers();
    }
  });

  return (
    <div style={styles.root}>
      {users ? (
        <UserTable
          users={users}
          businessId={businessId}
          role={role}
          refresh={forceRefresh}
        />
      ) : (
        <h3>{errorMessage}</h3>
      )}
    </div>
  );
}

export default People;

const styles: StyleSheet = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "10px",
    color: textMain,
  },
};
