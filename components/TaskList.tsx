import { Task } from "./Task";

import { useTasks } from "../utils/data";

export function TaskList() {
  const { loading, error, tasks } = useTasks();
  if (loading) {
    return <div className="m-4">Loading...</div>;
  } else if (error) {
    return <div className="m-4">{error.message}</div>;
  } else {
    return (
      <div className="flex flex-wrap p-4 gap-4">
        {tasks.map((task) => (
          <Task key={task._id} task={task} />
        ))}
      </div>
    );
  }
}
