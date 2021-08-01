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

// Set the role for the user.
export async function change (req: Request, res: Response) {
	try {
		const { uid } = req.params;
		const userRecord = await admin.auth().getUser(uid);
		const claims = userRecord.customClaims;
		if (claims && claims.role === "staff") {
			claims.role = "manager";
			admin.auth().setCustomUserClaims(uid, claims);
			return res.status(200).send({ message: "Manager role assigned" });
		} else {
			return res.status(406).send({ error: "Claims not found" });
		}
	} catch (err) {
		return handleError(res, err);
	}
}

// Standard error helper function.
function handleError (res: Response, err: Error) {
	return res.status(500).send({ error: `${err}` });
}
