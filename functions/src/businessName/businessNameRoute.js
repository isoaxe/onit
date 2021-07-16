import * as admin from "firebase-admin";
import { Router } from "express";

const router = Router();


// GET request to find business name associated with user.
router.get("/businessname/:id", async (req, res) => {
	const { id } = req.params;
	const db = admin.firestore();
	const userRef = await db.collection("users").doc("businessId-890506").collection("user").doc("Aaron Quigley");
	const userData = await userRef.get().then((doc) => doc.data());
	res.status(200).send(userData);
});

export default router;
