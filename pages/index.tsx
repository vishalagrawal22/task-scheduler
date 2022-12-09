import { useEffect } from "react";
import { requestPermission } from "../utils/notification";

export default function Home() {
  useEffect(() => {
    (async function () {
      await requestPermission();
    })();
  }, []);
  return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
}
