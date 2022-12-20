import type { NextApiRequest, NextApiResponse } from "next";

import { ITask } from "../../../utils/interfaces/Task";
import Task from "../../../models/Task";

import { getUserId, UNAUTHENTICATED_ERROR } from "../../../utils/auth/server";
import { connect } from "../../../utils/db";

interface PaginationInfo {
  limit?: number;
  skip?: number;
}

interface TaskInfo {
  createdBy: string;
  scheduledDateString?: string;
}

async function handleRetrieveTask(req: NextApiRequest, res: NextApiResponse) {
  const userId = await getUserId(req);

  const paginationInfo: PaginationInfo = {};
  if (req.query.limit) {
    paginationInfo.limit = Number(req.query.limit);
  }
  if (req.query.offset) {
    paginationInfo.skip = Number(req.query.offset);
  }

  const taskInfo: TaskInfo = {
    createdBy: userId,
  };

  if (req.query.date && !Array.isArray(req.query.date)) {
    taskInfo.scheduledDateString = req.query.date;
  }

  const count = await Task.countDocuments(taskInfo);
  const tasks = await Task.find(taskInfo, null, paginationInfo);
  res.status(200).json({ count, tasks });
}

async function handleCreateTask(req: NextApiRequest, res: NextApiResponse) {
  const userId = await getUserId(req);

  const { title, scheduledDate } = req.body;
  const taskData: ITask = {
    title,
    createdBy: userId,
    scheduledDate,
  };

  if (req.body.description) {
    taskData.description = req.body.description;
  }

  const task = new Task(taskData);
  await task.save();

  res.status(201).json({
    ok: true,
    message: "task created",
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connect();

    switch (req.method) {
      case "GET":
        await handleRetrieveTask(req, res);
        break;
      case "POST":
        await handleCreateTask(req, res);
        break;
      default:
        res.status(405).json({
          ok: false,
          message: "Method not allowed",
        });
        break;
    }
  } catch (error) {
    if (error === UNAUTHENTICATED_ERROR) {
      res.status(401).json({
        ok: false,
        message: "Unauthorized",
      });
    } else {
      res.status(500).json({
        ok: false,
        message: "Internal server error",
        error,
      });
    }
  }
}
