import "../styles/globals.css";
import { AppProps } from "next/app";
import { useEffect } from "react";

import * as NotificationService from "../utils/notification";
const { useNotification } = NotificationService;
import { useUser } from "../utils/auth/client";

export default function App({ Component, pageProps }: AppProps) {
  const { user, loading, error } = useUser();
  useNotification();
  useEffect(() => {
    (async function linkUserToNotification() {
      if (!loading && !error) {
        if (user) {
          await NotificationService.setUserId(user.uid);
          await NotificationService.requestPermission();
        } else {
          await NotificationService.removeUserId();
        }
      }
    })();
  }, [user, loading, error]);

  if (loading) {
    return <div className="m-4">Loading...</div>;
  } else if (error) {
    return <div className="m-4">{error.message}</div>;
  } else {
    return <Component {...pageProps} />;
  }
}
