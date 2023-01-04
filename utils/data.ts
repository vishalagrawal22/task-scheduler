import { useRouter } from "next/router";
import useSWR from "swr";

import { getAuthToken, useUser } from "./auth/client";

import { ITask } from "./interfaces/Task";

export const ISSUE_IN_NETWORK_RESPONSE =
  "an issue occured in network when making a request";

async function fetchAsUser(uri: string) {
  const authToken = await getAuthToken();
  const response = await fetch(uri, {
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw ISSUE_IN_NETWORK_RESPONSE;
  }
  const data = await response.json();
  return data;
}

export type Task = Required<Omit<ITask, "description">> &
  Pick<ITask, "description">;

export function useTasks() {
  const router = useRouter();
  const { user } = useUser();
  if (!user) {
    router.push("/login");
  }

  const { data, error, isLoading } = useSWR("/api/tasks", fetchAsUser);

  return {
    count: data?.count,
    tasks: (data?.tasks || []) as Task[],
    error,
    loading: isLoading,
  };
}
