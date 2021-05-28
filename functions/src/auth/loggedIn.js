import { Router } from "express";

const router = Router();


// Simple GET request to /loggedin in order to test API.
router.get("/", (req, res) => {
	res.status(200).send({ message: "Login successful" });
});

export default router;
