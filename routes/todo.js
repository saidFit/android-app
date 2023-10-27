const express = require('express');
const router = express.Router();
const autherization = require("../middleware/autherization");
const { createTodo, getAllTodosNoFinished, updateTodo, deleteTodo, getAllTodosFinished, updateTodoToFinished } = require("../controller/todoController");



router.get("/allTodos",autherization,getAllTodosNoFinished);
router.get("/todosFinished",autherization,getAllTodosFinished);
router.post("/updateTodoTofinished/:id",autherization,updateTodoToFinished);
router.post("/postTodo",autherization,createTodo);
router.put("/putTodo/:id",autherization,updateTodo);

router.delete("/deleteTodo/:id",autherization,deleteTodo);

module.exports = router;