import { Application } from "express";
import { create } from "./controller";
import { isAuthenticated } from "../auth/authenticated";
import { isAuthorized } from "../auth/authorized";


export function routesConfig(app: Application) {
  // Create a new user.
   app.post('/users',
       isAuthenticated,
       isAuthorized({ hasRole: ['admin', 'manager'] }),
       create
   );
   // Lists all users.
   app.get('/users', [
       isAuthenticated,
       isAuthorized({ hasRole: ['admin', 'manager'] }),
       all
   ]);
   // Get :id user.
   app.get('/users/:id', [
       isAuthenticated,
       isAuthorized({ hasRole: ['admin', 'manager'], allowSameUser: true }),
       get
   ]);
   // Updates :id user.
   app.patch('/users/:id', [
       isAuthenticated,
       isAuthorized({ hasRole: ['admin', 'manager'], allowSameUser: true }),
       patch
   ]);
   // Deletes :id user.
   app.delete('/users/:id', [
       isAuthenticated,
       isAuthorized({ hasRole: ['admin', 'manager'] }),
       remove
   ]);
}
