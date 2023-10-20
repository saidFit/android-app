const {Schema, default: mongoose} = require("mongoose");


const todoSchema = new Schema({

   userId:{type:Schema.Types.ObjectId,ref:" Auth"},
   title:{type:String,required:true},
   desc:{type:String,required:true},
   isFinished:{type:Boolean,default:false},

},{ timestamps: true });

module.exports = mongoose.model('Todo', todoSchema);