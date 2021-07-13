import * as admin from "firebase-admin";
import { Router } from "express";

const router = Router();


// GET request to find user role.
router.get("/role/:id", (req, res) => {
	const { id } = req.params;
	admin.auth().getUser(id)
		.then((userRecord) => {
			res.status(200).send(userRecord.customClaims);
		});
});

export default router;
