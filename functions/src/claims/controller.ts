import * as admin from "firebase-admin";
import { Request, Response } from "express";


// Find custom claims set for user.
export async function get (req: Request, res: Response) {
	try {
		const { id } = req.params;
		const userRecord = await admin.auth().getUser(id);
		return res.status(200).send(userRecord.customClaims);
	} catch (err) {
		return handleError(res, err);
	}
}

// Standard error helper function.
function handleError (res: Response, err: Error) {
	return res.status(500).send({ error: `${err}` });
}
