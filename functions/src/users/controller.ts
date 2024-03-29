import { Request, Response } from "express";
import * as admin from "firebase-admin";

// Create a new user.
export async function create(
  req: Request,
  res: Response
): Promise<Response<void>> {
  try {
    const { displayName, password, email, role } = req.body;

    if (!displayName || !password || !email || !role) {
      return res.status(400).send({ message: "Missing fields" });
    }

    const { uid } = await admin.auth().createUser({
      displayName,
      password,
      email,
    });
    await admin.auth().setCustomUserClaims(uid, { role });

    return res.status(201).send({ uid });
  } catch (err: any) {
    return handleError(res, err);
  }
}

// Returns a list of all users.
export async function all(
  req: Request,
  res: Response
): Promise<Response<void>> {
  try {
    const listUsers = await admin.auth().listUsers();
    const users = listUsers.users.map(mapUser);
    return res.status(200).send({ users });
  } catch (err: any) {
    return handleError(res, err);
  }
}

// Returns a user of a given id.
export async function get(
  req: Request,
  res: Response
): Promise<Response<void>> {
  try {
    const { id } = req.params;
    const user = await admin.auth().getUser(id);
    return res.status(200).send({ user: mapUser(user) });
  } catch (err: any) {
    return handleError(res, err);
  }
}

// Change user data given a user id.
export async function patch(
  req: Request,
  res: Response
): Promise<Response<void>> {
  try {
    const { id } = req.params;
    const { displayName, password, email, role } = req.body;

    if (!id || !displayName || !password || !email || !role) {
      return res.status(400).send({ message: "Missing fields" });
    }

    await admin.auth().updateUser(id, { displayName, password, email });
    await admin.auth().setCustomUserClaims(id, { role });
    const user = await admin.auth().getUser(id);

    return res.status(204).send({ user: mapUser(user) });
  } catch (err: any) {
    return handleError(res, err);
  }
}

// Delete a user of a given id.
export async function remove(
  req: Request,
  res: Response
): Promise<Response<void>> {
  try {
    const { id } = req.params;
    await admin.auth().deleteUser(id);
    return res.status(204).send({});
  } catch (err: any) {
    return handleError(res, err);
  }
}

// Helper function to create object containing user data.
function mapUser(user: admin.auth.UserRecord) {
  const customClaims = (user.customClaims || { role: "" }) as { role?: string };
  const role = customClaims.role ? customClaims.role : "";
  return {
    uid: user.uid,
    email: user.email || "",
    displayName: user.displayName || "",
    role,
    lastSignInTime: user.metadata.lastSignInTime,
    creationTime: user.metadata.creationTime,
  };
}

// Standard error helper function used in controller fuctions.
function handleError(res: Response, err: Error): Response<void> {
  return res.status(500).send({ error: `${err}` });
}
