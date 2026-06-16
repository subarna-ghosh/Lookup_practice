const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const taskSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  projectId: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    require: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  hoursWorked: {
    type: Number,
    require: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createOn: {
    type: Date,
    default: new Date(),
  },
  updateOn: {
    type: Date,
    default: new Date(),
  },
});

const TaskModel = mongoose.model("Task", taskSchema);
module.exports = TaskModel;
