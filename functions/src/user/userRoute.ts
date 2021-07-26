import { Application } from "express";
import { create, all } from "./controller";


export function userRoute (app: Application): void {
	// Create a new business user.
	app.post("/user",
		create
	);
	// Fetch all users within the business.
	app.get("/user",
		all
	);
}
