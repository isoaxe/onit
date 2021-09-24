import { Application } from "express";
import { create } from "./controller";
import { isAuthenticated } from "../auth/authenticated";
import { isAuthorised } from "../auth/authorised";


export function tasksRoute (app: Application): void {
	// POST request to create a new task.
	app.post("/tasks/:taskId/:businessId",
		isAuthenticated,
		isAuthorised({ hasRole: ["owner", "manager"] }),
		create
	);
}