import { Request, Response, NextFunction } from "express";
import * as admin from "firebase-admin";


export async function isAuthenticated (req: Request, res: Response, next: NextFunction): Promise<Response<void> | void> {
	const { authorization } = req.headers;

	if (!authorization)
		return res.status(401).send({ message: "No authorization field in header." });

	if (!authorization.startsWith("Bearer"))
		return res.status(401).send({ message: "Unauthorized due to token missing the 'Bearer' prefix" });

	const split = authorization.split("Bearer ");
	if (split.length !== 2)
		return res.status(401).send({ message: "Unauthorized due to multiple tokens" });

	const token = split[1];

	try {
		const decodedToken: admin.auth.DecodedIdToken = await admin.auth().verifyIdToken(token);
		res.locals = { ...res.locals, uid: decodedToken.uid, bid: decodedToken.businessId, role: decodedToken.role, email: decodedToken.email };
		return next();
	} catch (err) {
		console.error(`${err.code} -  ${err.message}`);
		return res.status(401).send({ message: "Authentication failure" });
	}
}
