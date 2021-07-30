import * as admin from "firebase-admin";
import { Request, Response } from "express";


// Find custom claims set for user.
export async function get (req: Request, res: Response) {
	const { id } = req.params;
	const userRecord = await admin.auth().getUser(id);
	res.status(200).send(userRecord.customClaims);
}
