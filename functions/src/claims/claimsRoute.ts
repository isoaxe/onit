import { Application } from "express";
import { get } from "./controller";


export function claimsRoute (app: Application): void {
	// GET custom claims for the user.
	app.get("/claims/:id",
		get
	);
}
