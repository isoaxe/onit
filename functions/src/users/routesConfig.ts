import { Application } from "express";
import { create, all, get, patch, remove } from "./controller";
import { isAuthenticated } from "../auth/authenticated";
import { isAuthorized } from "../auth/authorized";


export function routesConfig (app: Application): void {
	// Create a new user.
	app.post("/users",
		isAuthenticated,
		isAuthorized({ hasRole: ["owner", "manager"] }),
		create
	);
	// Lists all users.
	app.get("/users", [
		isAuthenticated,
		isAuthorized({ hasRole: ["owner", "manager"] }),
		all
	]);
	// Get :id user.
	app.get("/users/:id", [
		isAuthenticated,
		isAuthorized({ hasRole: ["owner", "manager"], allowSameUser: true }),
		get
	]);
	// Updates :id user.
	app.patch("/users/:id", [
		isAuthenticated,
		isAuthorized({ hasRole: ["owner", "manager"], allowSameUser: true }),
		patch
	]);
	// Deletes :id user.
	app.delete("/users/:id", [
		isAuthenticated,
		isAuthorized({ hasRole: ["owner", "manager"] }),
		remove
	]);
}
