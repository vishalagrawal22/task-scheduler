import { useEffect, useRef } from "react";

import OneSignal from "react-onesignal";

export function useNotification() {
  const ref = useRef(0);
  useEffect(() => {
    (async function setupNotification() {
      if (ref.current == 0) {
        ref.current += 1;
        await OneSignal.init({
          appId: process.env.NEXT_PUBLIC_ONE_SIGNAL_APP_ID || "",
          allowLocalhostAsSecureOrigin: true,
        });
      }
    })();
  }, []);
}

export async function requestPermission() {
  const perm = await OneSignal.isPushNotificationsEnabled();

  if (!perm) {
    alert("We need notification permission to notify you about your tasks.");
    await OneSignal.showNativePrompt();
  }
}

export async function getNotificationId() {
  const perm = await OneSignal.isPushNotificationsEnabled();
  if (perm) {
    const id = await OneSignal.getUserId();
    return id;
  }

  return null;
}
