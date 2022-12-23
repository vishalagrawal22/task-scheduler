import type { NextApiRequest, NextApiResponse } from "next";

import { ITask } from "../../../utils/interfaces/Task";
import Task from "../../../models/Task";

import { getUserId, UNAUTHENTICATED_ERROR } from "../../../utils/auth/server";
import { connect } from "../../../utils/db";

type TaskValue = keyof ITask;

async function handleEditTask(req: NextApiRequest, res: NextApiResponse) {
  const { taskId } = req.query;
  const task = await Task.findById(taskId);

  if (!task) {
    res.status(404).json({
      ok: false,
      message: "task not found!",
    });
    return;
  }

  const userId = await getUserId(req);
  if (task.createdBy !== userId) {
    res.status(403).json({
      ok: false,
      message: "cannot edit task which is not associated with signed in user",
    });
    return;
  }

  for (const key in req.body) {
    if (key in task) {
      task[key as TaskValue] = req.body[key];
    }
  }

  await task.save();
  res.status(200).json({
    ok: true,
    message: "task updated",
  });
}

async function handleDeleteTask(req: NextApiRequest, res: NextApiResponse) {
  const { taskId } = req.query;
  const task = await Task.findById(taskId);

  if (!task) {
    res.status(404).json({
      ok: false,
      message: "task not found!",
    });
    return;
  }

  const userId = await getUserId(req);
  if (task.createdBy !== userId) {
    res.status(403).json({
      ok: false,
      message: "cannot delete task which is not associated with signed in user",
    });
    return;
  }

  await task.delete();
  res.status(200).json({
    ok: true,
    message: "task deleted",
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connect();

    switch (req.method) {
      case "PUT":
        await handleEditTask(req, res);
        break;
      case "DELETE":
        await handleDeleteTask(req, res);
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
