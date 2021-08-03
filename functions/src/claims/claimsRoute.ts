import { Application } from "express";
import { get, change } from "./controller";
import { isAuthenticated } from "../auth/authenticated";
import { isAuthorised } from "../auth/authorised";


export function claimsRoute (app: Application): void {
	// GET custom claims for the user.
	app.get("/claims/:id",
		get
	);
	// POST request to change users role.
	app.post("/claims/:uid/:businessId",
		isAuthenticated,
		isAuthorised({ hasRole: ["owner"] }),
		change
	);
}
