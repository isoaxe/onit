import * as admin from "firebase-admin";
import { Router } from "express";

const router = Router();


// Simple GET request to /loggedin in order to test API.
router.get("/", (req, res) => {
	res.status(200).send({ message: "Login successful" });
});

// POST request to /loggedin/setrole in order to assign user role.
router.post("/setrole", (req, res) => {
	const { authorization } = req.headers;
	const token = authorization.split("Bearer ")[1];

	admin.auth().verifyIdToken(token)
		.then((decodedToken) => {
			const uid = decodedToken.uid;
			admin.auth().setCustomUserClaims(uid, { role: "admin" });
		})
		.then(res.status(200).send({ message: "Admin role assigned" }));
});

export default router;
