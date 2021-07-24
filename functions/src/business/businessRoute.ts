import { Application } from "express";
import { create, get } from "./controller";
import { isAuthenticated } from "../auth/authenticated";
import { isAuthorized } from "../auth/authorized";


export function businessRoute (app: Application): void {
	// Create a new business user.
	app.post("/business",
		create
	);
	// Fetch the business data from the Firestore.
	app.get("/business/:businessId", [
		isAuthenticated,
		isAuthorized({ hasRole: ["owner", "manager", "staff"] }),
		get
	]);
}
