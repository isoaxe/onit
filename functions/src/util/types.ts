/*
 *  Interfaces to define object shapes for TypeScript.
 */


// UserData type for combined Auth and Firestore data.
export interface UserData {
  uid: string;
  email: string;
  displayName: string;
  lastName: string | undefined;
  role: string | undefined;
  businessId: string | undefined;
  lastSignInTime: string;
  creationTime: string;
}
