import "../styles/globals.css";
import { AppProps } from "next/app";

import { useNotification } from "../utils/notification";
import { useUser } from "../utils/auth";

export default function App({ Component, pageProps }: AppProps) {
  useNotification();
  const { loading, error } = useUser();
  if (loading) {
    return <div className="m-4">Loading...</div>;
  } else if (error) {
    return <div className="m-4">{error.message}</div>;
  } else {
    return <Component {...pageProps} />;
  }
}
