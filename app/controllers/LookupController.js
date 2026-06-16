const User = require("../models/User");
const Department = require("../models/Department");
const Project = require("../models/Project");
const Task = require("../models/Task");
class LookupController {
  async createDepartment(req, res) {
    try {
      const { deptName, location } = req.body;
      const result = new Department({ deptName, location });
      const data = await result.save();
      return res.status(201).json({
        success: true,
        message: "department created successfully!",
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async viewDept(req, res) {
    try {
      const data = await Department.find({});
      return res.status(201).json({
        success: true,
        message: "departments fetched successfully!",
        count: data.length,
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async createUser(req, res) {
    try {
      const { name, email, role, deptId, salary } = req.body;
      const result = new User({ name, email, role, deptId, salary });
      const data = await result.save();
      return res.status(201).json({
        success: true,
        message: "user created successfully!",
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getUsers(req, res) {
    try {
      const data = await User.find({});
      return res.status(201).json({
        success: true,
        message: "users fetched successfully!",
        count: data.length,
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async createProject(req, res) {
    try {
      const { projectName, deptId, budget, status } = req.body;
      const result = new Project({ projectName, deptId, budget, status });
      const data = await result.save();
      return res.status(201).json({
        success: true,
        message: "project created successfully!",
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getProject(req, res) {
    try {
      const data = await Project.find({});
      return res.status(201).json({
        success: true,
        message: "projects fetched successfully!",
        count: data.length,
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async createTask(req, res) {
    try {
      const { title, assignedTo, projectId, status, hoursWorked } = req.body;
      const result = new Task({
        title,
        assignedTo,
        projectId,
        status,
        hoursWorked,
      });
      const data = await result.save();
      return res.status(201).json({
        success: true,
        message: "task created successfully!",
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getTask(req, res) {
    try {
      const data = await Task.find({});
      return res.status(201).json({
        success: true,
        message: "tasks fetched successfully!",
        count: data.length,
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async agg1(req, res) {
    try {
      const data = await Department.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "deptId",
            as: "users",
          },
        },
        {
          $project: {
            _id: 0,
            deptName: 1,
            users: "$users.name",
          },
        },
      ]);
      return res.status(201).json({
        success: true,
        message: "datas fetched successfully!",
        count: data.length,
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async agg2(req, res) {
    try {
      const data = await User.aggregate([
        {
          $lookup: {
            from: "departments",
            localField: "deptId",
            foreignField: "_id",
            as: "Dept",
          },
        },
        { $unwind: "$Dept" },
        { $group: { _id: "$Dept.deptName", totalUsers: { $sum: 1 } } },
        {
          $project: {
            _id: 0,
            deptName: "$_id",
            totalUsers: 1,
          },
        },
      ]);
      return res.status(201).json({
        success: true,
        message: "datas fetched successfully!",
        count: data.length,
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async agg3(req, res) {
    try {
      const data = await User.aggregate([
        {
          $lookup: {
            from: "departments",
            localField: "deptId",
            foreignField: "_id",
            as: "Dept",
          },
        },
        { $unwind: "$Dept" },
        { $group: { _id: "$Dept.deptName", totalUsers: { $sum: 1 } } },
        {
          $project: {
            _id: 0,
            deptName: "$_id",
            totalUsers: 1,
          },
        },
      ]);
      return res.status(201).json({
        success: true,
        message: "datas fetched successfully!",
        count: data.length,
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async agg4(req, res) {
    try {
      const data = await Project.aggregate([
        {
          $lookup: {
            from: "departments",
            localField: "deptId",
            foreignField: "_id",
            as: "Dept",
          },
        },
        {
          $unwind: "$Dept",
        },
        { $project: { _id: 0, projectName: 1, Dept: 1 } },
      ]);
      return res.status(201).json({
        success: true,
        message: "datas fetched successfully!",
        count: data.length,
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async agg5(req, res) {
    try {
      const data = await Task.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "assignedTo",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: "$user",
        },
        { $group: { _id: "$user.name", totalTask: { $sum: 1 } } },
        { $project: { _id: 0, totalTask: 1, User: "$_id" } },
      ]);
      return res.status(201).json({
        success: true,
        message: "datas fetched successfully!",
        count: data.length,
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async agg6(req, res) {
    try {
      const data = await User.aggregate([
        {
          $lookup: {
            from: "departments",
            localField: "deptId",
            foreignField: "_id",
            as: "Dept",
          },
        },
        {
          $unwind: "$Dept",
        },
        {
          $group: { _id: "$Dept.deptName", totalExpense: { $sum: "$salary" } },
        },
        { $project: { _id: 0, totalExpense: 1, DeptName: "$_id" } },
      ]);
      return res.status(201).json({
        success: true,
        message: "datas fetched successfully!",
        count: data.length,
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async agg7(req, res) {
    try {
      const data = await Project.aggregate([
        { $match: { status: "active" } },
        {
          $lookup: {
            from: "departments",
            localField: "deptId",
            foreignField: "_id",
            as: "Dept",
          },
        },
        {
          $unwind: "$Dept",
        },
        {
          $group: { _id: "$Dept.deptName", count: { $sum: 1 } },
        },
        // { $project: { _id: 0, totalExpense: 1, DeptName: "$_id" } },
      ]);
      return res.status(201).json({
        success: true,
        message: "datas fetched successfully!",
        count: data.length,
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async agg8(req, res) {
    try {
      const data = await Task.aggregate([
        { $match: { status: "completed" } },
        {
          $lookup: {
            from: "users",
            localField: "assignedTo",
            foreignField: "_id",
            as: "User",
          },
        },
        {
          $unwind: "$User",
        },
        {
          $group: {
            _id: "$User._id",
            userName: { $first: "$User.name" },
            completedTasks: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            userName: 1,
            completedTasks: 1,
          },
        },
      ]);
      return res.status(201).json({
        success: true,
        message: "datas fetched successfully!",
        count: data.length,
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async agg9(req, res) {
    try {
      const data = await Task.aggregate([
        { $match: { status: "completed" } },
        {
          $lookup: {
            from: "users",
            localField: "assignedTo",
            foreignField: "_id",
            as: "User",
          },
        },
        {
          $unwind: "$User",
        },
        {
          $group: {
            _id: "$User._id",
            userName: { $first: "$User.name" },
            completedTasks: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            userName: 1,
            completedTasks: 1,
          },
        },
        {
          $sort: {
            completedTasks: -1,
          },
        },
        {
          $limit: 3,
        },
      ]);
      return res.status(201).json({
        success: true,
        message: "datas fetched successfully!",
        count: data.length,
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async agg10(req, res) {
    try {
      const data = await Project.aggregate([
        {
          $lookup: {
            from: "tasks",
            localField: "_id",
            foreignField: "projectId",
            as: "Task",
          },
        },
        {
          $unwind: "$Task",
        },
        {
          $group: {
            _id: "$projectName",
            totalHours: { $sum: "$Task.hoursWorked" },
          },
        },
        {
          $project: {
            _id: 0,
            projectName: "$_id",
            totalHours: 1,
          },
        },
      ]);
      return res.status(201).json({
        success: true,
        message: "datas fetched successfully!",
        count: data.length,
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async agg11(req, res) {
    try {
      const data = await Department.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "deptId",
            as: "users",
          },
        },
        {
          $lookup: {
            from: "projects",
            localField: "_id",
            foreignField: "deptId",
            as: "projects",
          },
        },
        {
          $project: {
            _id: 0,
            departmentName: "$deptName",

            totalUsers: {
              $size: "$users",
            },

            totalProjects: {
              $size: "$projects",
            },

            totalBudget: {
              $sum: "$projects.budget",
            },
          },
        },
      ]);
      return res.status(201).json({
        success: true,
        message: "datas fetched successfully!",
        count: data.length,
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async agg12(req, res) {
    try {
      const data = await User.aggregate([
        {
          $lookup: {
            from: "tasks",
            localField: "_id",
            foreignField: "assignedTo",
            as: "tasks",
          },
        },
        {
          $match: {
            tasks: { $size: 0 },
          },
        },
        {
          $project: {
            _id: 0,
            name: 1,
            email: 1,
            role: 1,
          },
        },
      ]);

      return res.status(200).json({
        success: true,
        count: data.length,
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async agg13(req, res) {
    try {
      const data = await User.aggregate([
        {
          $lookup: {
            from: "departments",
            localField: "deptId",
            foreignField: "_id",
            as: "Dept",
          },
        },
        { $unwind: "$Dept" },
        {
          $group: {
            _id: "$Dept.deptName",
            totalSalaryExpense: {
              $sum: "$salary",
            },
          },
        },
        {
          $sort: {
            totalSalaryExpense: -1,
          },
        },
        {
          $limit: 1,
        },
        {
          $project: {
            _id: 0,
            departmentName: "$_id",
            totalSalaryExpense: 1,
          },
        },
      ]);

      return res.status(200).json({
        success: true,
        count: data.length,
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async agg14(req, res) {
    try {
      const data = await Project.aggregate([
        {
          $lookup: {
            from: "tasks",
            localField: "_id",
            foreignField: "projectId",
            as: "Task",
          },
        },
        { $unwind: "$Task" },
        { $group: { _id: "$projectName", totalTasks: { $sum: 1 } } },
        {
          $match: {
            status: "completed",
          },
        },
        // {
        //   $project: {
        //     _id: 0,
        //     totalTasks: { $sum:1},
        //   },
        // },
      ]);

      return res.status(200).json({
        success: true,
        count: data.length,
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async agg15(req, res) {
    try {
      const data = await User.aggregate([
        {
          $group: {
            _id: {
              month: { $month: "$createOn" },
            },
            totalUsers: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            month: "$_id.month",
            totalUsers: 1,
          },
        },
        {
          $sort: {
            month: 1,
          },
        },
      ]);

      return res.status(200).json({
        success: true,
        count: data.length,
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async agg16(req, res) {
    try {
      const data = await Task.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "assignedTo",
            foreignField: "_id",
            as: "User",
          },
        },
        { $unwind: "$User" },
        {
          $group: {
            _id: "$User.name",
            totalHoursWorked: { $sum: "$hoursWorked" },
          },
        },
        { $project: { _id: 0, userName: "$_id", totalHoursWorked: 1 } },
      ]);

      return res.status(200).json({
        success: true,
        count: data.length,
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async agg17(req, res) {
    try {
      const data = await User.aggregate([
        {
          $lookup: {
            from: "departments",
            localField: "deptId",
            foreignField: "_id",
            as: "Dept",
          },
        },
        { $unwind: "$Dept" },
        {
          $group: {
            _id: "$Dept.deptName",
            avgSalary: { $avg: "$salary" },
          },
        },
        { $match: { avgSalary: { $gt: 50000 } } },
        {
          $project: {
            _id: 0,
            deptName: "$_id",
            avgSalary: 1,
          },
        },
      ]);

      return res.status(200).json({
        success: true,
        count: data.length,
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async agg18(req, res) {
    try {
      const data = await Project.aggregate([
        {
          $lookup: {
            from: "tasks",
            localField: "_id",
            foreignField: "projectId",
            as: "Task",
          },
        },
        {
          $project: {
            _id: 0,
            projectName: 1,
            budget: 1,

            totalHoursWorked: {
              $sum: "$Task.hoursWorked",
            },

            totalEmployeesInvolved: {
              $size: {
                $setUnion: ["$Task.assignedTo", []], //set removes duplicates.
              },
            },
          },
        },
      ]);

      return res.status(200).json({
        success: true,
        count: data.length,
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async agg19(req, res) {
    try {
      const data = await Task.aggregate([
        {
          $group: {
            _id: "$assignedTo",
            projects: { $addToSet: "$projectId" }, // adds value to an array unless the value is already present
          },
        },
        {
          $project: {
            projectCount: {
              $size: "$projects",
            },
          },
        },
        {
          $match: {
            projectCount: { $gt: 2 },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "_id", //assignedTo
            foreignField: "_id",
            as: "User",
          },
        },
        { $project: { _id: 0, userName: "$User.name", projectCount: 1 } },
      ]);

      return res.status(200).json({
        success: true,
        count: data.length,
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async agg20(req, res) {
    try {
      const data = await User.aggregate([
        { $group: { _id: null, totalSalaryExpense: { $sum: "$salary" } } },
        { $project: { _id: 0, totalSalaryExpense: 1 } },
      ]);
      const totalUsers = await User.countDocuments();
      const totalDepartments = await Department.countDocuments();

      const totalActiveProjects = await Project.countDocuments({
        status: "active",
      });

      const totalCompletedTasks = await Task.countDocuments({
        status: "completed",
      });
      return res.status(200).json({
        success: true,
        count: data.length,
        totalDepartments,
        totalActiveProjects,
        totalCompletedTasks,
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
module.exports = new LookupController();
