import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Header } from "../components/Header";
import { Task } from "../components/Task";
import { getAuthToken, useUser } from "../utils/auth/client";
import { ITask } from "../utils/interfaces/Task";

export default function Home() {
  const router = useRouter();
  const { user } = useUser();
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    (async function fetchTasks() {
      const authToken = await getAuthToken();
      const response = await fetch("/api/tasks", {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTasks(data.tasks);
      }
    })();
  }, []);

  if (!user) {
    router.push("/login");
  } else {
    return (
      <>
        <Header user={user} />
        <div className="flex flex-wrap p-4 gap-4">
          {tasks.map((task: ITask) => (
            <Task key={task._id} task={task} />
          ))}
        </div>
      </>
    );
  }
}
