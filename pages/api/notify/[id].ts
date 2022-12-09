import axios, { AxiosError } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id;

  const data = JSON.stringify({
    app_id: process.env.NEXT_PUBLIC_ONE_SIGNAL_APP_ID,
    include_player_ids: [id],
    contents: {
      en: "English or Any Language Message",
    },
  });

  const config = {
    method: "post",
    url: "https://onesignal.com/api/v1/notifications",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${process.env.ONE_SIGNAL_REST_API_KEY}`,
    },
    data,
  };

  axios(config).catch(function (error: AxiosError) {
    console.error(error);
  });

  res.status(200).end();
}
