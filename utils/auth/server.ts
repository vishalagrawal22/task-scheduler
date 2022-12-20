import type { NextApiRequest } from "next";
import { auth } from "../../firebase-config/server";

export const UNAUTHENTICATED_ERROR = "unauthenticated";

export async function getUserId(req: NextApiRequest) {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const authToken = authHeader.substring(7, authHeader.length);
    if (authToken) {
      const { uid } = await auth.verifyIdToken(authToken);
      return uid;
    }
  }
  throw UNAUTHENTICATED_ERROR;
}
