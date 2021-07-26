import * as admin from "firebase-admin";
import { Request, Response } from "express";


// Create new staff user.
export async function create (req: Request, res: Response): Promise<Response<void>> {
	try {
		const role = "staff";
		const { displayName, phoneNumber, email, password, lastName, businessId } = req.body;

		// Check that businessId exists by querying the Firestore.
		const db = admin.firestore();
		const idList = await db.collection("users").listDocuments();
		const ids = idList.map(doc => doc.id.split("businessId-")[1]);
		if (!ids.includes(businessId)) {
			return res.status(400).send({ error: "businessId not found" });
		}

		const { uid } = await admin.auth().createUser({
			displayName,
			phoneNumber,
			email,
			password
		});

		admin.auth().setCustomUserClaims(uid, { role, businessId });

		// Not all required user data can be stored by auth. Use Firestore instead.
		const user = db.collection("users").doc(`businessId-${businessId}`)
			.collection("users").doc(uid);
		user.set({
			firstName: displayName,
			lastName,
			uid,
			role,
			businessId
		});

		return res.status(200).send({ message: "Staff account created" });
	} catch (err) {
		return handleError(res, err);
	}
}

// Returns a list of all users.
export async function all (res: Response): Promise<Response<void>> {
	try {
		const listUsers = await admin.auth().listUsers();
		const users = listUsers.users.map(mapUser);
		return res.status(200).send({ users });
	} catch (err) {
		return handleError(res, err);
	}
}

// Helper function to create object containing user data.
function mapUser (user: admin.auth.UserRecord) {
	const customClaims = (user.customClaims || { role: "" }) as { role?: string };
	const role = customClaims.role ? customClaims.role : "";
	return {
		uid: user.uid,
		email: user.email || "",
		displayName: user.displayName || "",
		role,
		lastSignInTime: user.metadata.lastSignInTime,
		creationTime: user.metadata.creationTime
	};
}

// Standard error helper function.
function handleError (res: Response, err: Error) {
	return res.status(500).send({ error: `${err}` });
}
