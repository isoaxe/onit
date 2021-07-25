import { Application } from "express";
import { create } from "./controller";


export function userRoute (app: Application): void {
	// Create a new business user.
	app.post("/user",
		create
	);
}
