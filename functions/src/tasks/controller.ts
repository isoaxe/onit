import * as admin from "firebase-admin";
import { Request, Response } from "express";


// Create and save the task to Firestore.
export async function create (req: Request, res: Response): Promise<Response<void>> {
	try {
		const { title, message } = req.body;
		const { taskId, businessId } = req.params;

		// Check that businessId exists by querying the Firestore.
		const db = admin.firestore();
		const idList = await db.collection("users").listDocuments();
		const ids = idList.map(doc => doc.id.split("businessId-")[1]);
		if (!ids.includes(businessId)) {
			return res.status(400).send({ error: "businessId not found" });
		}

		// Save task data to Firestore.
		const task = db.collection("tasks").doc(`businessId-${businessId}`)
			.collection("tasks").doc(taskId);
		task.set({
			title,
			message,
			businessId
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
