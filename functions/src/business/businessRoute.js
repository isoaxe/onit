import * as admin from "firebase-admin";
import { Router } from "express";

const router = Router();


// Create business user with POST request to /business.
router.post("/business", (req, res) => {
	// Generate a 6-digit businessId:
	const businessId = Math.random()*1000000;
	/* Add logic here to ensure that the businessId is unique */

	admin.auth().createUser({
		/* Not everything gets saved, need to use Firestore. */
		businessName: req.body.businessName,
		address1: req.body.address1,
		address2: req.body.address2,
		city: req.body.city,
		postcode: req.body.postcode,
		phoneNumber: req.body.phone,
		email: req.body.email,
		password: req.body.password
	})
		.then((response) => {
			admin.auth().setCustomUserClaims(response.uid, { role: "company", id: businessId });
		})
		.then(res.status(200).send({ message: "Company user created" }));
});

// Standard error helper function.
function handleError (res, err) {
	return res.status(500).send({ error: `${err}` });
}

export default router;
