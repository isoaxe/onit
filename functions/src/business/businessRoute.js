import * as admin from "firebase-admin";
import { Router } from "express";

const router = Router();


// Create business user with POST request to /business.
router.post("/business", async (req, res) => {
	const role = "company";
	
	// Generate a 6-digit businessId:
	const businessId = Math.round(Math.random()*1000000);
	/* Add logic here to ensure that the businessId is unique */

	const { uid } = await admin.auth().createUser({
		displayName: req.body.businessName,
		phoneNumber: req.body.phone,
		email: req.body.email,
		password: req.body.password
	});

	admin.auth().setCustomUserClaims(uid, { role: role, id: businessId });

	// Not all required user data can be stored by auth. Use Firestore instead.
	const db = admin.firestore();
	const doc = db.collection("users").doc(`businessId-${businessId}`);
	doc.set({
		uid: uid,
		role: role,
		address1: req.body.address1,
		address2: req.body.address2,
		city: req.body.city,
		postcode: req.body.postcode,
	});

	res.status(200).send({ message: "Company account created" });
});

// Standard error helper function.
function handleError (res, err) {
	return res.status(500).send({ error: `${err}` });
}

export default router;
