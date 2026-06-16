const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    enum: ["admin", "manager", "employee"],
    require: true,
  },
  deptId: {
    type: Schema.Types.ObjectId,
    ref: "Department",
    require: true,
  },
  salary: {
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

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
