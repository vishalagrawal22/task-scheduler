export interface ITask {
  title: String;
  description?: String;
  createdBy: String;
  scheduledDate: Date;
  scheduledDateString?: String;
  completed?: Boolean;
}
