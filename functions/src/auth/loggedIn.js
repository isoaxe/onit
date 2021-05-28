import { Router } from "express";

const router = Router();


// Simple GET request to /loggedin in order to test API.
router.get("/", (req, res) => {
	res.status(200).send({ message: "Login successful" });
});

// Simple GET request to /loggedin/setrole to test API.
router.get("/setrole", (req, res) => {
	res.status(200).send({ message: "/setrole endpoint reached" });
});

export default router;
