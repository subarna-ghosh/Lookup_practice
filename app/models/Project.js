const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const projectSchema = new Schema({
  projectName: {
    type: String,
    require: true,
  },
  deptId: {
    type: Schema.Types.ObjectId,
    ref: "Department",
    require: true,
  },
  budget: {
    type: Number,
    require: true,
  },
  status: {
    type: String,
    enum: ["active", "completed"],
    default: "active",
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

const ProjectModel = mongoose.model("Project", projectSchema);
module.exports = ProjectModel;
