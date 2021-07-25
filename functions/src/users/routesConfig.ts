import { Application } from "express";
import { create, all, get, patch, remove } from "./controller";
import { isAuthenticated } from "../auth/authenticated";
import { isAuthorised } from "../auth/authorised";


export function routesConfig (app: Application): void {
	// Create a new user.
	app.post("/users",
		isAuthenticated,
		isAuthorised({ hasRole: ["owner", "manager"] }),
		create
	);
	// Lists all users.
	app.get("/users", [
		isAuthenticated,
		isAuthorised({ hasRole: ["owner", "manager"] }),
		all
	]);
	// Get :id user.
	app.get("/users/:id", [
		isAuthenticated,
		isAuthorised({ hasRole: ["owner", "manager"], allowSameUser: true }),
		get
	]);
	// Updates :id user.
	app.patch("/users/:id", [
		isAuthenticated,
		isAuthorised({ hasRole: ["owner", "manager"], allowSameUser: true }),
		patch
	]);
	// Deletes :id user.
	app.delete("/users/:id", [
		isAuthenticated,
		isAuthorised({ hasRole: ["owner", "manager"] }),
		remove
	]);
}
