import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";

import { routesConfig } from "./users/routesConfig";


// Initialise the firebase-admin SDK in order to access its services.
admin.initializeApp();

const app = express();

// Automatically allow cross-origin requests.
app.use(cors({ origin: true }));

app.use(bodyParser.json());

// Set the handlers for each http verb.
routesConfig(app);

// Expose Express API as a single Cloud Function.
export const api = functions.https.onRequest(app);
