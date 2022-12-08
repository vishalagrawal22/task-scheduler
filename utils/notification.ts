import { useEffect, useRef } from "react";

import OneSignal from "react-onesignal";

export function useNotification() {
  const ref = useRef(0);
  useEffect(() => {
    (async function setupNotification() {
      if (ref.current == 0) {
        ref.current += 1;
        await OneSignal.init({
          appId: "f01a89c0-c069-4b63-9529-7e9e3581dc2e",
          allowLocalhostAsSecureOrigin: true,
        });
      }
    })();
  }, []);
}
