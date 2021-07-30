import * as admin from "firebase-admin";
import { Request, Response } from "express";


// Find custom claims set for user.
export async function get (req: Request, res: Response) {
	const { id } = req.params;
	admin.auth().getUser(id)
		.then((userRecord) => {
			res.status(200).send(userRecord.customClaims);
		});
}
