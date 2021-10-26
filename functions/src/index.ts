import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";

import { businessRoute } from "./business/businessRoute";
import { userRoute } from "./user/userRoute";
import { tasksRoute } from "./tasks/tasksRoute";
import { claimsRoute } from "./claims/claimsRoute";


// Initialise the firebase-admin SDK in order to access its services.
admin.initializeApp();

const app = express();

// Automatically allow cross-origin requests.
app.use(cors({ origin: true }));

app.use(bodyParser.json());

// Set handler for business accounts.
businessRoute(app);
// Set handler for individual user accounts.
userRoute(app);
// Set handler for tasks.
tasksRoute(app);
// Set handler for setting and fetching custom claims.
claimsRoute(app);

// Expose Express API as a single Cloud Function.
export const api = functions.https.onRequest(app);
