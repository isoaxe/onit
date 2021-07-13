import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";

import { routesConfig } from "./users/routesConfig";
import loginSuccessRoute from "./loginSuccess/loginSuccess";
import businessRoute from "./business/businessRoute";
import userRoute from "./user/userRoute";
import roleRoute from "./role/roleRoute";


// Initialise the firebase-admin SDK in order to access its services.
admin.initializeApp();

const app = express();

// Automatically allow cross-origin requests.
app.use(cors({ origin: true }));

app.use(bodyParser.json());

// Set handler for when user logs in successfully.
app.use(loginSuccessRoute);
// Set handler for business accounts.
app.use(businessRoute);
// Set handler for individual user accounts.
app.use(userRoute);
// Set handler for user role setting and fetching.
app.use(roleRoute);

// Set the handlers for each http verb.
routesConfig(app);

// Expose Express API as a single Cloud Function.
export const api = functions.https.onRequest(app);
