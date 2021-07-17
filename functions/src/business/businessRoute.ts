import * as admin from "firebase-admin";
import * as localeMapper from "country-locale-map";
import { Router, Request, Response } from "express";

const router: Router = Router();


// Create business user with POST request to /business.
router.post("/business", async (req: Request, res: Response) => {
	try {
		const role = "company";
		const { displayName, phoneNumber, email, password, address1, address2, city, phoneNumberCountry, postcode } = req.body;
		const country = localeMapper.getCountryNameByAlpha2(phoneNumberCountry);

		// Check that businessId is unique by querying the Firestore for current ids.
		const db = admin.firestore();
		const idList = await db.collection("users").listDocuments();
		const ids = idList.map(doc => doc.id.split("businessId-")[1]);
		let businessId = getBusinessId();
		while (ids.includes(businessId)) {
			businessId = getBusinessId();
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
			.collection("company").doc(displayName);
		user.set({
			uid,
			role,
			address1,
			address2,
			city,
			country,
			postcode,
		});

		res.status(200).send({ message: "Company account created" });
	} catch (err) {
		handleError(res, err);
	}
});


// GET request to fetch business data from Firestore.
router.get("/business/:businessId", async (req, res) => {
	try {
		const { businessId } = req.params;
		const db = admin.firestore();
		const companyRef = await db.collection("users").doc(`businessId-${businessId}`).collection("company").get();
		const businessData = companyRef.docs[0].data();
		res.status(200).send(businessData);
	} catch (err) {
		handleError(res, err);
	}
});


// Standard error helper function.
function handleError (res: Response, err: Error) {
	return res.status(500).send({ error: `${err}` });
}


// Generate a 6-digit businessId integer and convert to string:
function getBusinessId (): string {
	const id =  Math.round(Math.random()*1000000);
	const idString = id.toString();
	const leadingZeros = 6 - idString.length;
	let leadingZerosAsStr = "";
	for (let i = 0; i < leadingZeros; i++) {
		leadingZerosAsStr += "0";
	}
	return leadingZerosAsStr + idString;
}


export default router;
