import * as admin from "firebase-admin";
import { Request, Response } from "express";
import { UserData } from "./../util/types";


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

		await admin.auth().setCustomUserClaims(uid, { role, businessId });

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
export async function all (req: Request, res: Response): Promise<Response<void>> {
	try {
		const { businessId } = req.params;

		// Get primary user data from Auth.
		const listUsers = await admin.auth().listUsers();
		const allUsers = listUsers.users.map(mapUser);
		const companyUsers = allUsers.filter(user => user.businessId === businessId);

		// Get additional user data from Firestore.
		const db = admin.firestore();
		const firestoreData: {lastName: string}[] = [];
		const firestoreRef = await db.collection("users").doc(`businessId-${businessId}`)
			.collection("users").get();
		firestoreRef.forEach((doc) => {
			const data = doc.data();
			firestoreData.push({ lastName: data.lastName });
		});

		// Merge data.
		const userData: UserData[] = [];
		for (let i = 0; i < companyUsers.length; i++) {
			const mergedObj = Object.assign(companyUsers[i], firestoreData[i]);
			userData.push(mergedObj);
		}

		return res.status(200).send(userData);
	} catch (err) {
		return handleError(res, err);
	}
}


// Helper function to create object containing user data.
function mapUser (user: admin.auth.UserRecord) {
	const customClaims = (user.customClaims || { role: "", businessId: "" }) as { role?: string, businessId?: string };
	const role = customClaims.role;
	const businessId = customClaims.businessId;
	return {
		uid: user.uid,
		email: user.email || "",
		displayName: user.displayName || "",
		role,
		businessId,
		lastSignInTime: user.metadata.lastSignInTime,
		creationTime: user.metadata.creationTime.slice(5, 16)
	};
}


// Standard error helper function.
function handleError (res: Response, err: Error) {
	return res.status(500).send({ error: `${err}` });
}
