import * as admin from "firebase-admin";
import { Router } from "express";

const router = Router();


// Create business user with POST request to /business.
router.post("/business", (req, res) => {
	// Generate a 6-digit businessId:
	const businessId = Math.round(Math.random()*1000000);
	/* Add logic here to ensure that the businessId is unique */

	admin.auth().createUser({
		displayName: req.body.businessName,
		phoneNumber: req.body.phone,
		email: req.body.email,
		password: req.body.password
	})
		.then((res) => {
			admin.auth().setCustomUserClaims(res.uid, { role: "company", id: businessId });
		})
		.then(() => {
			// Not all required user data can be stored by auth. Use Firestore instead.
			const db = admin.firestore();
			const doc = db.collection("users").doc(`${businessId}`);
			doc.set({
				//uid: res.uid, /* uid cannot be accessed here and cannot be passed down the promise chain */
				role: "company",
				address1: req.body.address1,
				address2: req.body.address2,
				city: req.body.city,
				postcode: req.body.postcode,
			});
		})
		.then(res.status(200).send({ message: "Company account created" }));
});

// Standard error helper function.
function handleError (res, err) {
	return res.status(500).send({ error: `${err}` });
}

export default router;
