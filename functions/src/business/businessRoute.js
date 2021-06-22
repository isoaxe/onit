import * as admin from "firebase-admin";
import * as localeMapper from "country-locale-map";
import { Router } from "express";

const router = Router();


// Create business user with POST request to /business.
router.post("/business", async (req, res) => {
	try {
		const role = "company";
		const { displayName, phoneNumber, email, password, address1, address2, city, phoneNumberCountry, postcode } = req.body;
		const country = localeMapper.getCountryNameByAlpha2(phoneNumberCountry);

		// Check that businessId is unique by querying the Firestore for current ids.
		const ids = [];
		const db = admin.firestore();
		const users = db.collection("users");
		const businessIds = await users.get();
		businessIds.forEach(doc => {
			const id = doc.id.split("businessId-")[1];
			ids.push(id);
		});
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
			postcode,
		});

		res.status(200).send({ message: "Company account created" });
	} catch (err) {
		handleError(res, err);
	}
});

// Standard error helper function.
function handleError (res, err) {
	return res.status(500).send({ error: `${err}` });
}

// Generate a 6-digit businessId integer:
function getBusinessId () {
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
