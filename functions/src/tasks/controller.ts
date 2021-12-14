import * as admin from "firebase-admin";
import { Request, Response } from "express";


// Create and save the task to Firestore.
export async function create (req: Request, res: Response): Promise<Response<void>> {
	try {
		const { title, message, assignees, allDay, start, end, timeOffset, assignedTime, assigneeUids, assignor, assignorUid } = req.body;
		const { taskId, businessId } = req.params;

		// Cast strings as other data types.
		const assigneeArray = assignees.split(",");
		const allDayBoolean = (allDay === "true");
		const assigneeUidArray = assigneeUids.split(",");

		// Save task data to Firestore.
		const db = admin.firestore();
		const task = db.collection("tasks").doc(`businessId-${businessId}`)
			.collection("tasks").doc(taskId);
		task.set({
			id: taskId,
			title,
			allDay: allDayBoolean,
			start,
			end,
			extendedProps: {
				message,
				completionTime: null,
				assignedTime,
				assignees: assigneeArray,
				assigneeUids: assigneeUidArray,
				assignor,
				assignorUid,
				timeOffset,
			}
		});

		return res.status(200).send({ message: "Task created" });
	} catch (err) {
		return handleError(res, err);
	}
}

// Edit and save existing task to Firestore.
export async function edit (req: Request, res: Response): Promise<Response<void>> {
	try {
		const completionTime = req.body;
		const { taskId, businessId } = req.params;

		// Save task data to Firestore.
		const db = admin.firestore();
		const task = db.collection("tasks").doc(`businessId-${businessId}`)
			.collection("tasks").doc(taskId);
		task.set({ extendedProps: { completionTime } }, { merge: true });
		return res.status(200).send({ message: "Completion time saved." });
	} catch (err) {
		return handleError(res, err);
	}
}

// Get the tasks assigned to the user of a given uid.
export async function assigned (req: Request, res: Response): Promise<Response<void>> {
	try {
		const { userId, businessId } = req.params;
		const db = admin.firestore();
		const firestoreRef = await db.collection("tasks").doc(`businessId-${businessId}`)
			.collection("tasks").get();
		const tasks = [{}]; // Start array with placeholder object.
		firestoreRef.forEach((doc) => {
			const task = doc.data();
			if (task.extendedProps.assigneeUids.includes(userId)) {
				tasks.push(task);
			}
		});
		tasks.shift(); // Remove placeholder object from array.
		return res.status(200).send(tasks);
	} catch (err) {
		return handleError(res, err);
	}
}

// Get all tasks from the Firestore.
export async function all (req: Request, res: Response): Promise<Response<void>> {
	try {
		const { businessId } = req.params;
		const db = admin.firestore();
		const firestoreRef = await db.collection("tasks").doc(`businessId-${businessId}`)
			.collection("tasks").get();
		const tasks = [{}]; // Start array with placeholder object.
		firestoreRef.forEach((doc) => {
			const task = doc.data();
			tasks.push(task);
		});
		tasks.shift(); // Remove placeholder object from array.
		return res.status(200).send(tasks);
	} catch (err) {
		return handleError(res, err);
	}
}

// Standard error helper function.
function handleError (res: Response, err: Error) {
	return res.status(500).send({ error: `${err}` });
}
