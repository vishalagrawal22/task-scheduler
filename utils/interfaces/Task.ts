export interface ITask {
  _id: keyof ITask;
  title: String;
  description?: String;
  createdBy: String;
  scheduledDate: Date;
  scheduledDateString?: String;
  completed?: Boolean;
}
