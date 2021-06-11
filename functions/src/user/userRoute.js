import * as admin from "firebase-admin";
import { Router } from "express";

const router = Router();


// Create user with POST request to /user.
router.post("/user", async (req, res) => {
	try {
		const role = "user";
		const { displayName, phoneNumber, email, password, lastName, businessId } = req.body;

		const { uid } = await admin.auth().createUser({
			displayName,
			phoneNumber,
			email,
			password
		});

		admin.auth().setCustomUserClaims(uid, { role, businessId });

		// Not all required user data can be stored by auth. Use Firestore instead.
		const db = admin.firestore();
		const user = db.collection("users").doc(`businessId-${businessId}`)
			.collection("user").doc(`${displayName} ${lastName}`);
		user.set({
			firstName: displayName,
			lastName,
			uid,
			role,
			businessId
		});

		res.status(200).send({ message: "User account created" });
	} catch (err) {
		handleError(res, err);
	}
});

// Standard error helper function.
function handleError (res, err) {
	return res.status(500).send({ error: `${err}` });
}


export default router;
