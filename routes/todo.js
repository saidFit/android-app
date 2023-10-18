const express = require('express');
const router = express.Router();
const autherization = require("../middleware/autherization");
const { createTodo, getAllTodos, updateTodo, deleteTodo } = require("../controller/todoController");



router.get("/allTodos",autherization,getAllTodos);
router.post("/postTodo",autherization,createTodo);
router.put("/putTodo/:id",autherization,updateTodo);
router.delete("/deleteTodo/:id",autherization,deleteTodo);

module.exports = router;