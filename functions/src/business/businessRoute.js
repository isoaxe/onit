import * as admin from "firebase-admin";
import { Router } from "express";

const router = Router();


// Create business user with POST request to /business.
router.post("/business", (req, res) => {
	admin.auth().createUser({
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
			// Need to also assign role and businessId to the business.
		})
		.then(res.status(200).send({ message: "Company user created" }));
});

export default router;
