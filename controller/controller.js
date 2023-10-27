const User = require("../models/Auth");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const CreateToken = (userId) =>{
    const payload = {
      id: userId,
    };                         // this time represent which token has been expired
    // const token = jwt.sign(payload, SECRET, { expiresIn: '1h' }); // Set token expiration if desired
    const token = jwt.sign(payload, process.env.SECRET);
    return token;
  }

const createUser = (async (req,res) =>{

     const {username,email,password} = req.body;
    
     console.log(req.body);
     

      try {

        const userExist = await User.findOne({email:email});
        
        if (userExist) {
            // throw new Error("This user already exists. Please try another email.");
            return res.status(400).json({"message":"This user already exists. Please try another email."})
          }

        const hash = bcrypt.hashSync(password, 5);
        const newUser = new User({...req.body,password:hash})
        await newUser.save();

        return res.status(201).json({userData:newUser,token:CreateToken(newUser._id)})
      } catch (error) {
        return res.status(400).json({message:error.message})
      }

});


const login = (async(req,res) =>{

    const {email,password} = req.body;
    console.log(req.body);

    try {
        const emailExist =await User.findOne({email:email});

        if(!emailExist){
            // throw new Error("this email not exist try again.")
            return res.status(400).json({"message":"this email not exist try again."})
        }

        const isPasswordMatch = await bcrypt.compare(password, emailExist.password);

        if(!isPasswordMatch){
            // throw new Error("the password not match try again.")
            return res.status(400).json({"message":"the password not match try again."})
        }
        return res.status(200).json({userData:emailExist,token:CreateToken(emailExist._id)});

    } catch (error) {
        return res.status(400).json({"message":error.message});
    }

})


const updateProfile = (async(req,res) =>{
   
   const {id} = req.params;

   try {
    
       const updateUser = await User.findByIdAndUpdate(id,req.body,{new : true});
       if(!updateUser){
        return res.status(404).json({"message":"this user not found!"});
       }
    
       res.status(201).json({"message":"update user profile successfully",user:updateUser})


   } catch (error) {
     res.status(400).json({"message":error.message})
   }
    
})

module.exports={
    createUser,
    login,
    updateProfile,
}