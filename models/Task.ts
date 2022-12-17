import { Model, Schema } from "mongoose";

import createModel from "../utils/db";

interface ITask {
  title: String;
  description: String;
  createdBy: String;
  scheduledDate: Date;
  scheduledDateString: String;
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
  createdBy: {
    type: String,
    required: true,
  },
  scheduledDate: {
    type: Date,
    required: true,
  },
  scheduledDateString: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

taskSchema.pre("save", function (next) {
  this.scheduledDateString = this.scheduledDate.toLocaleDateString();
  next();
});

const Task = createModel<ITask, TaskModel>("Task", taskSchema);
export default Task;
