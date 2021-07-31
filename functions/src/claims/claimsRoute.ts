import { Application } from "express";
import { get, change } from "./controller";


export function claimsRoute (app: Application): void {
	// GET custom claims for the user.
	app.get("/claims/:id",
		get
	);
	// POST request to change users role.
	app.post("/claims/:uid",
		change
	);
}
