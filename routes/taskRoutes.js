const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/createTask', authMiddleware.verifyToken, taskController.createTask);
router.post('/createSubTask', authMiddleware.verifyToken, taskController.createSubTask);
router.get('/getAllUserTasks/:userId', authMiddleware.verifyToken, taskController.getAllUserTasks);
router.get('/getAllUserSubTasks/:taskId', authMiddleware.verifyToken, taskController.getAllUserSubTasks);
router.put('/updateTask/:taskId', authMiddleware.verifyToken, taskController.updateTask);
router.put('/updateSubTask/:subTaskId', authMiddleware.verifyToken, taskController.updateSubTask);
router.delete('/deleteTask/:taskId', authMiddleware.verifyToken, taskController.deleteTask);
router.delete('/deleteSubTask/:subTaskId', authMiddleware.verifyToken, taskController.deleteSubTask);

module.exports = router;
