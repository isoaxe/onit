import * as admin from "firebase-admin";
import { Router } from "express";

const router = Router();


// Create user with POST request to /user.
router.post("/user", async (req, res) => {
	try {
		const role = "user";
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
		console.log("we have an error");
		handleError(res, err);
	}
});

// Standard error helper function.
function handleError (res, err) {
	return res.status(500).send({ error: `${err}` });
}


export default router;
