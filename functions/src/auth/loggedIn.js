import { Request, Response, NextFunction, Router } from "express";

const router = Router();


router.get("/", (req: Request, res: Response, next: NextFunction) => {
	res.status(200).send({ message: "success" });
});

export default router;
