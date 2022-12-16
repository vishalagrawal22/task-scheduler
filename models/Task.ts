import { Model, Schema } from "mongoose";

import createModel from "../utils/db";

interface ITask {
  title: String;
  description: String;
  scheduledDate: Date;
  completed: Boolean;
}

type TaskModel = Model<ITask, {}>;

const taskSchema = new Schema<ITask, TaskModel>({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
  },
  description: String,
  scheduledDate: {
    type: Date,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Task = createModel<ITask, TaskModel>("Task", taskSchema);
export default Task;
