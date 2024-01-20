const Task = require("../models/Task");
const SubTask = require("../models/Subtask");
const User = require("../models/User");
const cron = require("node-cron");
const twilioService = require("../services/twilioService");
const makeVoiceCall = async (toPhoneNumber) => {
  try {
    const call = await twilioService.makeVoiceCall(toPhoneNumber);
    return call.status;
  } catch (error) {
    console.error("Twilio Call Error:", error);
    return "error";
  }
};

cron.schedule("* * * * *", async () => {
  try {
    const today = new Date();
    await Task.updateMany(
      { due_date: { $lte: new Date(today.setHours(23, 59, 59, 999)) } },
      { priority: 0 }
    );
    const twoDaysLater = new Date(today);
    twoDaysLater.setDate(today.getDate() + 2);
    await Task.updateMany(
      {
        due_date: {
          $gte: new Date(today.setHours(0, 0, 0, 0)),
          $lt: new Date(twoDaysLater.setHours(23, 59, 59, 999)),
        },
      },
      { priority: 1 }
    );
    await Task.updateMany({}, { status: "TODO" });

    const tasks = await Task.find();
    for (const task of tasks) {
      const subtasks = await SubTask.find({ task_id: task._id });

      const isAnySubtaskCompleted = subtasks.some(
        (subtask) => subtask.status === 1
      );

      if (isAnySubtaskCompleted) {
        task.status = "IN_PROGRESS";
      }
      const areAllSubtasksCompleted = subtasks.every(
        (subtask) => subtask.status === 1
      );

      if (areAllSubtasksCompleted) {
        task.status = "DONE";
      }
      await task.save();
    }
  } catch (error) {
    console.error("Cron Job Error:", error);
  }
});

cron.schedule("* * * * *", async () => {
  try {
    const users = await User.find().sort({ priority: "asc" }).exec();
    console.log("Twilio started");
    for (const user of users) {
      console.log(user.phone_number);
      const callStatus = await makeVoiceCall(user.phone_number);

      if (callStatus === "completed") {
        break;
      }
    }
  } catch (error) {
    console.error("Cron Job Error:", error);
  }
});

exports.createTask = async (req, res) => {
  try {
    const { title, description, due_date } = req.body;
    const { user_id } = req.user;

    const newTask = new Task({ title, description, due_date, user_id });
    const savedTask = await newTask.save();

    res.json(savedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createSubTask = async (req, res) => {
  try {
    const { task_id } = req.body;

    const newSubTask = new SubTask({ task_id });
    const savedSubTask = await newSubTask.save();

    res.json(savedSubTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllUserTasks = async (req, res) => {
  try {
    const userId = req.params.userId;

    const tasks = await Task.find({ user_id: userId, deleted_at: null }).exec();

    res.json({ tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllUserSubTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const { task_id } = req.query;
    let subtasks;

    if (task_id) {
      subtasks = await SubTask.find({ task_id, deleted_at: null });
    } else {
      subtasks = await SubTask.find({ user_id: userId, deleted_at: null });
    }

    res.json({ subtasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const { due_date, status } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { due_date, status },
      { new: true }
    );

    res.json({ updatedTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateSubTask = async (req, res) => {
  try {
    const subTaskId = req.params.subTaskId;
    const { status } = req.body;

    const updatedSubTask = await SubTask.findByIdAndUpdate(
      subTaskId,
      { status },
      { new: true }
    );

    res.json({ updatedSubTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;

    await Task.findByIdAndUpdate(taskId, { deleted_at: new Date() });

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteSubTask = async (req, res) => {
  try {
    const subTaskId = req.params.subTaskId;
    await SubTask.findByIdAndUpdate(subTaskId, { deleted_at: new Date() });

    res.json({ message: "Subtask deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
