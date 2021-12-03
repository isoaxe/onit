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

// Get all tasks from the Firestore.
export async function all (req: Request, res: Response): Promise<Response<void>> {
	try {
		const { businessId } = req.params;
		const db = admin.firestore();
		const firestoreRef = await db.collection("tasks").doc(`businessId-${businessId}`)
			.collection("tasks").get();
		const tasks = [{}]; // Start array with placeholder object.
		firestoreRef.forEach((doc) => {
			const data = doc.data();
			tasks.push(data);
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
