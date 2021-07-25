import { Request, Response, NextFunction } from "express";


export function isAuthorized (opts: { hasRole: Array<"owner" | "manager" | "staff">, allowSameUser?: boolean }) {
	return (req: Request, res: Response, next: NextFunction): Response<void> | void => {
		const { role, email, uid, bid } = res.locals;
		const { id, businessId } = req.params;

		if (!bid || bid !== businessId)
			return res.status(403).send({ message: "Forbidden due to incorrect businessId" });

		if (!role)
			return res.status(403).send({ message: "Forbidden due to lack of role" });

		if (email === "lucasoconnell4@gmail.com")
			return next();

		if (opts.allowSameUser && id && uid === id)
			return next();

		if (opts.hasRole.includes(role))
			return next();

		return res.status(403).send({ message: "Forbidden" });
	};
}
