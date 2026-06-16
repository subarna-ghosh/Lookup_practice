const express = require("express");
const Router = express.Router();
const LookupController = require("../controllers/LookupController");

// department
Router.post("/create/department", LookupController.createDepartment);
Router.get("/view/departments", LookupController.viewDept);
// user
Router.post("/create/user", LookupController.createUser);
Router.get("/view/users", LookupController.getUsers);
// project
Router.post("/create/project", LookupController.createProject);
Router.get("/view/projects", LookupController.getProject);
// task
Router.post("/create/task", LookupController.createTask);
Router.get("/view/tasks", LookupController.getTask);
// operations
Router.get("/agg1", LookupController.agg1);
Router.get("/agg2", LookupController.agg2);
Router.get("/agg3", LookupController.agg3);
Router.get("/agg4", LookupController.agg4);
Router.get("/agg5", LookupController.agg5);
Router.get("/agg6", LookupController.agg6);
Router.get("/agg7", LookupController.agg7);
Router.get("/agg8", LookupController.agg8);
Router.get("/agg9", LookupController.agg9);
Router.get("/agg10", LookupController.agg10);
Router.get("/agg11", LookupController.agg11);
Router.get("/agg12", LookupController.agg12);
Router.get("/agg13", LookupController.agg13);
Router.get("/agg14", LookupController.agg14);//
Router.get("/agg15", LookupController.agg15);
Router.get("/agg16", LookupController.agg16);
module.exports = Router;
