import { Application } from "express";
import { create, edit, assigned, all } from "./controller";
import { isAuthenticated } from "../auth/authenticated";
import { isAuthorised } from "../auth/authorised";


export function tasksRoute (app: Application): void {
	// POST request to create a new task.
	app.post("/tasks/:taskId/:businessId",
		isAuthenticated,
		isAuthorised({ hasRole: ["owner", "manager"] }),
		create
	);
	// PUT request to edit a task.
	app.put("/tasks/:taskId/:businessId",
		isAuthenticated,
		isAuthorised({ hasRole: ["staff", "owner", "manager"] }),
		edit
	);
	// GET tasks that have been assigned to the user.
	app.get("/tasks/:userId/:businessId",
		isAuthenticated,
		isAuthorised({ hasRole: ["staff"] }),
		assigned
	);
	// GET all tasks.
	app.get("/tasks/:businessId",
		isAuthenticated,
		isAuthorised({ hasRole: ["owner", "manager"] }),
		all
	);
}
