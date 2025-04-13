import completeTask from "../models/board.model.js";


export const createTask = async (req,res,next)=>{
 try {
    const {title,description,dueDate,priority,taskStatus,subTask} = req.body;

 const normalizedDueDate = new Date(dueDate);
    normalizedDueDate.setUTCHours(0, 0, 0, 0)
    const newTask  = await completeTask.create({
        title,
        description,
        dueDate:normalizedDueDate,
        priority,
        taskStatus,
        subTask,
        createdBy:req.user.userId
    })
    if(!newTask){
        return res.status(400).json({
            success:false,
            message:'error in creating task'
        })
    }
    return res.status(200).json({
        success:true,
        newTask

    })
 } catch (error) {
    return res.status(400).json({
        success:false,
        message:error.message
    })
 }
}
export const activeTask = async (req,res,next)=>{
try {
    // console.log(req)
    const id = req.user.userId

  
    const taskForYou = await completeTask.find({createdBy:id})

if(!taskForYou){
    return res.status(400).json({
        success:false,
        message:'error in fetching task'
    })
}
return res.status(200).json({
    success:true,
   taskForYou
})
} catch (error) {
    return res.status(400).json({
        success:false,
       message:error.message
    })
}
}

export const todayTask = async (req,res,next)=>{
 try {
    const id = req.user.userId;
    
    const normalizedDueDate = new Date();
    normalizedDueDate.setUTCHours(0, 0, 0, 0)
  
    console.log(normalizedDueDate)
    const todayTask = await completeTask.find(
        {
            createdBy:id,
            dueDate:{$eq:normalizedDueDate}
        }
    )
    return res.status(200).json({
        success:true,
        todayTask
    })
 } catch (error) {
    return res.status(400).json({
        success:false,
        message:error.message
    })
 }
    
}

export const allTask = async (req,res,next)=>{
    try {
        const AllTask = await completeTask.find();
        console.log(AllTask)
        return res.status(200).json({
            success:true,
            AllTask
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}