const express = require("express");
const Router = express.Router();

const lookupRoutes = require("./lookupRoutes");
Router.use('/lookup',lookupRoutes);

module.exports = Router;
