import * as admin from "firebase-admin";
import { Router } from "express";

const router = Router();


// Create business user with POST request to /business.
router.post("/business", (req, res) => {
	// Generate a unique 6-digit businessId:
	const businessId = Math.random()*1000000;

	admin.auth().createUser({
		/* Not everything gets saved, need to use Firestore. */
		businessName: req.body.businessName,
		businessId: businessId,
		address1: req.body.address1,
		address2: req.body.address2,
		city: req.body.city,
		postcode: req.body.postcode,
		phoneNumber: req.body.phone,
		email: req.body.email,
		password: req.body.password
	})
		.then((response) => {
			admin.auth().setCustomUserClaims(response.uid, { role: "company" });
		})
		.then(res.status(200).send({ message: "Company user created" }));
});

export default router;
