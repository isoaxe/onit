import * as admin from "firebase-admin";
import { Router } from "express";

const router = Router();


// Create business user with POST request to /business.
router.post("/business", async (req, res) => {
	try {
		const role = "company";
		const { displayName, phoneNumber, email, password, address1, address2, city, postcode } = req.body;

		// Check that businessId is unique by querying the Firestore for current ids.
		const ids = [];
		const db = admin.firestore();
		const users = db.collection("users");
		const businessIds = await users.get();
		businessIds.forEach(doc => {
			const id = doc.id.split("businessId-")[1];
			ids.push(id);
		});
		let businessId = getBusinessId();
		while (ids.includes(businessId)) {
			businessId = getBusinessId;
		}

		const { uid } = await admin.auth().createUser({
			displayName,
			phoneNumber,
			email,
			password
		});

		admin.auth().setCustomUserClaims(uid, { role, businessId });

		// Not all required user data can be stored by auth. Use Firestore instead.
		const user = db.collection("users").doc(`businessId-${businessId}`);
		user.set({
			uid,
			role,
			address1,
			address2,
			city,
			postcode,
		});

		res.status(200).send({ message: "Company account created" });
	} catch (err) {
		handleError(res, err);
	}
});

// Standard error helper function.
function handleError (res, err) {
	return res.status(500).send({ error: `${err}` });
}

function getBusinessId () {
	// Generate a 6-digit businessId integer:
	return Math.round(Math.random()*1000000);
}

export default router;
