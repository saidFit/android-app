const express = require('express');
const router = express.Router();
const {createUser, login, updateProfile} = require("../controller/controller");
const autherization = require('../middleware/autherization');


//todo---Http requests---//

router.post("/register",createUser);
router.post("/login",login)
router.put("/updateUser/:id",autherization,updateProfile)
router.get("/geTodos",autherization,(req,res) =>{
    try {
        return res.status(201).json({"Todo":"successfully."}) 
    } catch (error) {
        throw new Error(error.message);
    }
   
})


module.exports = router;