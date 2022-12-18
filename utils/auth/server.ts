import type { NextApiRequest } from "next";
import { auth } from "../../firebase-config/server";

export const UNAUTHENTICATED_ERROR = "unauthenticated";

export async function getUserId(req: NextApiRequest) {
  const { authToken } = req.body;
  if (!authToken) {
    throw UNAUTHENTICATED_ERROR;
  }
  const { uid } = await auth.verifyIdToken(authToken);
  return uid;
}
