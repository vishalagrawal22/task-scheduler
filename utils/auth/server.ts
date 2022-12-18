import type { NextApiRequest } from "next";
import { auth } from "../../firebase-config/server";

export async function getUserId(req: NextApiRequest) {
  const { authToken } = req.body;
  const { uid } = await auth.verifyIdToken(authToken);
  return uid;
}
