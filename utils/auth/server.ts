import { auth } from "../../firebase-config/server";

export async function getUserId(authToken: string) {
  const { uid } = await auth.verifyIdToken(authToken);
  return uid;
}
