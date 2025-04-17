import express from 'express';
import { createTask,activeTask, todayTask, allTask } from '../controller/boardController.js';
import { authorizedRoles, verifyToken } from '../middleware/auth.middleware.js';

const userTask = express.Router();


userTask.post('/create-task',verifyToken,createTask)
userTask.get('/active-task',verifyToken,activeTask)
userTask.get('/today-task',verifyToken,todayTask)
userTask.get('/all-task', authorizedRoles('ADMIN'),allTask)
export default userTask