/*
 * Various helper functions used throughout the project.
 */
import firebase from "firebase/app";
import generator from "generate-password";
import { API_URL } from "../util/urls";

// POST form data. Used for account and task creation.
export async function postFormDataAsJson({ url, formData }) {
  const plainFormData = Object.fromEntries(formData.entries());
  const formDataJsonString = JSON.stringify(plainFormData);
  let token: string;
  try {
    token = await firebase.auth().currentUser.getIdToken(true);
  } catch {
    token = "no_token_found";
  }
  const fetchConfig = {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: formDataJsonString,
  };

  const response = await fetch(url, fetchConfig);
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  return response.json();
}

// GET custom claims for the user.
export async function getClaims(user: firebase.User) {
  try {
    const token = await user.getIdToken(true);
    const requestOptions = {
      method: "GET",
      headers: { authorization: `Bearer ${token}` },
    };
    const response = await fetch(
      `${API_URL}/claims/${user.uid}`,
      requestOptions
    );
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error(`An error occured whilst fetching claims: ${error}`);
  }
}

// Get business data from the Firestore.
export async function getBusinessData(user: firebase.User, businessId: string) {
  try {
    const token = await user.getIdToken(true);
    const requestOptions = {
      method: "GET",
      headers: { authorization: `Bearer ${token}` },
    };
    const response = await fetch(
      `${API_URL}/business/${businessId}`,
      requestOptions
    );
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error(`An error occured whilst fetching business data: ${error}`);
  }
}

// GET only assigned tasks for staff users and all tasks for other users.
export async function getTasks(role, businessId, userId) {
  try {
    const token = await firebase.auth().currentUser.getIdToken(true);
    const requestOptions = {
      method: "GET",
      headers: { authorization: `Bearer ${token}` },
    };
    let res;
    if (role === "staff") {
      res = await fetch(
        `${API_URL}/tasks/${userId}/${businessId}`,
        requestOptions
      );
    } else {
      res = await fetch(`${API_URL}/tasks/${businessId}`, requestOptions);
    }
    const taskArray = await res.json();
    return addTaskAttributes(taskArray);
  } catch (error) {
    console.error(`GET request to /tasks failed: ${error}`);
  }
}

// Generate an id for tasks.
export function getId() {
  return generator.generate({
    length: 28,
    numbers: true,
  });
}

// Get the supplied date as a ISO string with local time.
export function isoLocalDate(date) {
  const epochLocalTime = date.getTime() - date.getTimezoneOffset() * 60 * 1000;
  return new Date(epochLocalTime).toISOString().substring(0, 19);
}

// Takes an ISO 8601 compliant date and formats it nicely.
export function formatDate(compliantDate) {
  const date = new Date(compliantDate);
  const day = ordinal(date.getDate());
  const month = new Intl.DateTimeFormat("en", { month: "long" }).format(date);
  const hours = date.getHours();
  const unformattedMins = date.getMinutes();
  const minutes =
    unformattedMins < 10 ? "0" + unformattedMins : unformattedMins;
  return `${month} ${day} at ${hours}:${minutes}`;
}

/*
 * Helpers for the above helper functions...
 */

// Add correct suffix to supplied date.
function ordinal(number) {
  const ordinalRules = new Intl.PluralRules("en", {
    type: "ordinal",
  });
  const suffixes = {
    one: "st",
    two: "nd",
    few: "rd",
    other: "th",
  };
  const suffix = suffixes[ordinalRules.select(number)];
  return number + suffix;
}

// Add additional attributes to each event object in the tasks array.
function addTaskAttributes(tasks) {
  const now = isoLocalDate(new Date());
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].extendedProps.completionTime) {
      tasks[i].color = "#71797E";
    } else if (tasks[i].end < now) {
      tasks[i].color = "#AD2D06";
      tasks[i].extendedProps.overdue = true;
    }
  }
  return tasks;
}
