# Onit

Onit is a progressive web application (PWA) that allows the owners of condominiums or apartment complexes to manage tasks for their residents. A common business model is for owners of a block to be responsible for the upkeep and repair, in addition to the provision of other tasks the resident might request. Onit allows the owner to aggregate and manage all tasks on a single platform. They can then be scheduled and assigned to members of staff in an organised and co-ordinated manner.


## Technology

This PWA was bootstrapped using the Create React App template. It was written primarily in TypeScript, thus ensuring type-safety.

All backend functions were handled via Firebase. This includes authentication, Firestore (as the NoSQL database) and functions (which handle backend functionality via a serverless architecture). Hosting is also managed by Firebase.

Within Firebase functions, a role-based API was built using `Express.js`. This restricts user access to various app functions based on the role that they have been assigned.


## Initial Setup

Since the whole project lies behind a login screen, even testing requires the setting up of a [Firebase project](https://firebase.google.com/) (hosting, functions and Firestore database), which is not covered here. Do this first.

Then fork the project from this GitHub repo and run the following shell commands.

### `npm install -g firebase-tools`

After setting up the Firebase project, install the Firebase CLI.

### `firebase login`

You will also need to [login](https://firebase.google.com/docs/cli#sign-in-test-cli) and link this project to the remote, which will be your Google account.


## Project Setup

In the **onit directory**, run the following commands:

### `npm install`

Install all of the Node dependencies for React and other third party packages used in the frontend.

### `npm run get-keys` (local only)

First follow the steps in the Firebase [documentation](https://firebase.google.com/docs/functions/local-emulator#set_up_admin_credentials_optional) to download the private keys from the Service Accounts pane of the Google Cloud console. Then change the [get-keys](https://github.com/Isoaxe/onit/blob/master/package.json#L39) script to reflect the local path where the keys are stored and the correct filename of the keys at that location. Finally, run the script.

### `cd functions`

Navigate to the functions folder in a new shell tab to complete configuration of Firebase functions.

### `npm install`

Install all of the Node dependencies for Express and other third party packages used by Firebase functions.

### `cd .. && npm run dev` (local only)

Move up to the main directory again and run the `dev` script. This starts the app in development mode. It utilises the `concurrently` package to run three different scripts at the same time. These are the `npm start` command, `npm run watch` from the functions directory which runs the `build` command in watch mode and finally `npm run build` from root. This allows the constant transpiling of TypeScript code to JavaScript as changes are made to the project.

### `npm run deploy-all` (hosted only)

Deploy Firebase hosting, Firebase functions and Firestore rules from the root directory. In future, these can be deployed separately as required. Run `npm deploy-rules` from this main directory for Firestore rules, `npm deploy` to deploy hosting or the same script from the `functions` directory to deploy functions. If the `dev` script has not been run before, then run `npm run build-all` prior to deployment.
