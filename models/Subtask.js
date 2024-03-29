const mongoose = require('mongoose');

const subTaskSchema = new mongoose.Schema({
  task_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  status: { type: Number, default:0 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: null },
  deleted_at: { type: Date, default: null },
});

const SubTask = mongoose.model('SubTask', subTaskSchema);

module.exports = SubTask;
