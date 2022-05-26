import { Application } from "express";
import { create, all } from "./controller";
import { isAuthenticated } from "../auth/authenticated";
import { isAuthorised } from "../auth/authorised";


export function userRoute (app: Application): void {
	// Create a new staff user.
	app.post("/user",
		create
	);
	// Fetch all users within the business.
	app.get("/user/:businessId",
		isAuthenticated,
		isAuthorised({ hasRole: ["owner", "manager"] }),
		all
	);
}
