import * as admin from "firebase-admin";
import { Request, Response } from "express";


// Create and save the task to Firestore.
export async function create (req: Request, res: Response): Promise<Response<void>> {
	try {
		const { title, message, assignees, allDay, start, end, timeOffset, assignedTime, assigneeUids } = req.body;
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
				timeOffset,
			}
		});

		return res.status(200).send({ message: "Task created" });
	} catch (err) {
		return handleError(res, err);
	}
}

// Standard error helper function.
function handleError (res: Response, err: Error) {
	return res.status(500).send({ error: `${err}` });
}
