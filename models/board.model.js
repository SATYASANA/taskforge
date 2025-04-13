import mongoose,{model,Schema} from "mongoose";

const boardTask = new Schema({
 createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true

 },
   title:{
    type:String,
    required:[true,'title is required']
   },
   description:{
    type:String,
    required:[true,'Description is required']
   },
   dueDate:{
    type:Date,
    required:true,
   
   },
   priority:{
    type:String,
    enum:['Low','Medium','High'],
    required:true
   },
   taskStatus:{
    type:String,
    enum:['Backlog','In Progress','Done'],
    required:true
   },
   subTask:[
    {
        title:{type:String},
        isDone:{
            type:Number,
            enum:[0,1],
            default:0

        },

    },

   ]


},{timestamps:true})

const completeTask = model('completeTask',boardTask)

export default completeTask;
