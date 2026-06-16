const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const deptSchema = new Schema({
  deptName: {
    type: String,
    require: true,
  },
  location: {
    type: String,
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

const DepartmentModel = mongoose.model("Department", deptSchema);
module.exports = DepartmentModel;
