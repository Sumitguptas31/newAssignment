const express = require('express');
const router = express.Router();
const UserController = require("../Controllers/UserController")
const projectController= require("../Controllers/projectController")
const taskController= require("../Controllers/taskController")
const Middleware= require("../Middlewares/Auth")



router.post("/register",UserController.signUp)
router.post("/login",UserController.loginUser)
router.post('/project',projectController.createProject)
router.get('/project/:projectId',Middleware.authentication,Middleware.authorisation,projectController. getProjectById)
router.put('/project/:projectId',Middleware.authentication,Middleware.authorisation,projectController.updateProject)
router.post("/project/:projectId/task",taskController.createTask)
router.post("/task/:taskId",taskController.getTaskById)
router.put('/project/:projectId/task/:taskId',taskController.updateTask)



module.exports=router;