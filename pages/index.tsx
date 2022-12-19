import { useRouter } from "next/router";

import { Header } from "../components/Header";
import { useUser } from "../utils/auth/client";

export default function Home() {
  const router = useRouter();
  const { user } = useUser();
  if (!user) {
    router.push("/login");
  } else {
    return (
      <>
        <Header user={user} />
      </>
    );
  }
}
