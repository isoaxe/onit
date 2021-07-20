import * as admin from "firebase-admin";
import { Router } from "express";

const router = Router();


// GET request to find custom claims set for user.
router.get("/claims/:id", (req, res) => {
	const { id } = req.params;
	admin.auth().getUser(id)
		.then((userRecord) => {
			res.status(200).send(userRecord.customClaims);
		});
});

export default router;
