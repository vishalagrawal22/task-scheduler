import "../styles/globals.css";
import { AppProps } from "next/app";

import { useNotification } from "../utils/notification";

export default function App({ Component, pageProps }: AppProps) {
  useNotification();
  return <Component {...pageProps} />;
}
