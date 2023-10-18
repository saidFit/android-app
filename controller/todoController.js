const Todo = require("../models/Todo");


const createTodo = (async(req,res) =>{
     const {title,desc} = req.body; 

     if(!title || !desc){
        return res.status(401).json({"message":"title or desc should't be empty!"})
     }
    try {
        
        const todo = await new Todo({
            userId:req.userId,
            title,
            desc
        }).save();

       return res.status(201).json({"message":"add todo successfully",todo:todo});

    } catch (error) {
      
        return res.status(401).json({message:error.message});
        
    }

})

const getAllTodos = (async(req,res) =>{


    try{
        const todos = await Todo.find();
      return res.status(201).json({"todos":todos});

    }catch(error){
      return res.status(401).json({"message":error.message})
    }
})

const updateTodo = (async(req,res) =>{

     const {id} = req.params;
     
    try{

        const updatedTodo = await Todo.findByIdAndUpdate(id,req.body, { new: true });
        //todo The { new: true } option ensures that the updated todo is returned.

        if(!updatedTodo){
            return res.status(404).json({"message":"todo not found"});
        }

        const todos = await Todo.find();
       return res.status(201).json({"updateTodo":updatedTodo,"todos":todos});

    }catch(error){
        return res.status(401).json({"message":error.mesage});
    }

})


const deleteTodo = (async(req,res) =>{

      const {id} = req.params;


    try{
 
        const deleteTodo = await Todo.findByIdAndRemove(id);

        if(!deleteTodo){
            return res.status(404).json({"message":"todo not found"})
        }

        const todos = await Todo.find();
        res.status(201).json({"message":"deleted todo successfully.","todos":todos})


    }catch(error){
     return res.status(400).json({"message":error.message})
    }

})


module.exports={
    createTodo,
    getAllTodos,
    updateTodo,
    deleteTodo
}