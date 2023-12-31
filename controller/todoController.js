const Todo = require("../models/Todo");


const createTodo = (async(req,res) =>{
     const {title,desc,isFinished} = req.body; 

     if(!title || !desc){
        return res.status(401).json({"message":"title or desc should't be empty!"})
     }
    try {
      
        const todo = await new Todo({
            userId:req.userId,
            title,
            desc,
            isFinished:isFinished || false // set false value if the isFinished not exist in the request data;
        }).save();

       return res.status(201).json({"message":"add todo successfully",todo:todo});

    } catch (error) {
      
        return res.status(401).json({message:error.message});
        
    }

});

const getAllTodosFinished = (async(req,res) =>{

    try {
        const todoFinished = await Todo.find({isFinished:true});
        res.status(200).json({"todos":todoFinished});
    } catch (error) {
        res.status(401).json({"message":error.message})
    }


})

const getAllTodosNoFinished = (async(req,res) =>{


    try{
        const todos = await Todo.find({isFinished:false});
      return res.status(201).json({"todos":todos});

    }catch(error){
      return res.status(401).json({"message":error.message})
    }
})

const updateTodoToFinished = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(id, { isFinished: true }, { new: true });
        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json({ message: 'Todo finished successfully.', todo: updatedTodo });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

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
            return res.status(404).json({"message":"todo not found at this id"})
        }

        const todos = await Todo.find();
        res.status(201).json({"message":"deleted todo successfully.","todos":todos})


    }catch(error){
     return res.status(400).json({"message":error.message})
    }

})


module.exports={
    createTodo,
    getAllTodosNoFinished,
    updateTodo,
    deleteTodo,
    getAllTodosFinished,
    updateTodoToFinished
}