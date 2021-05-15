import { Request, Response, NextFunction } from "express";


export function isAuthorized (opts: { hasRole: Array<"admin" | "manager" | "user">, allowSameUser?: boolean }) {
   return (req: Request, res: Response, next: NextFunction): Response<void> | void => {
       const { role, email, uid } = res.locals;
       const { id } = req.params;

       if (email === "lucasoconnell4@gmail.com")
           return next();

       if (opts.allowSameUser && id && uid === id)
           return next();

       if (opts.hasRole.includes(role))
           return next();

       if (!role)
           return res.status(403).send();

       return res.status(403).send();
   };
}
