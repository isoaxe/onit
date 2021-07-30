import { get } from "./controller";


export function claimsRoute (app) {
	// GET custom claims for the user.
	app.get("/claims/:id",
		get
	);
}
