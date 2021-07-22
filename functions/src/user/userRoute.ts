import * as admin from "firebase-admin";
import { Router, Request, Response } from "express";

const router: Router = Router();


// Create user with POST request to /user.
router.post("/user", async (req: Request, res: Response) => {
	try {
		const role = "staff";
		const { displayName, phoneNumber, email, password, lastName, businessId } = req.body;

		// Check that businessId exists by querying the Firestore.
		const db = admin.firestore();
		const idList = await db.collection("users").listDocuments();
		const ids = idList.map(doc => doc.id.split("businessId-")[1]);
		if (!ids.includes(businessId)) {
			return res.status(400).send({ error: "businessId not found" });
		}

		const { uid } = await admin.auth().createUser({
			displayName,
			phoneNumber,
			email,
			password
		});

		admin.auth().setCustomUserClaims(uid, { role, businessId });

		// Not all required user data can be stored by auth. Use Firestore instead.
		const user = db.collection("users").doc(`businessId-${businessId}`)
			.collection("users").doc(uid);
		user.set({
			firstName: displayName,
			lastName,
			uid,
			role,
			businessId
		});

		return res.status(200).send({ message: "Staff account created" });
	} catch (err) {
		return handleError(res, err);
	}
});

// Standard error helper function.
function handleError (res: Response, err: Error) {
	return res.status(500).send({ error: `${err}` });
}


export default router;
