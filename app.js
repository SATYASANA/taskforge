import express from "express"
import morgan from "morgan";
import cors from 'cors'
import cookieParser from "cookie-parser";
import userRouter from "./Router/user.route.js";
import userTask from "./Router/task.route.js";
const app = express();

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));
app.use('/api/v1',userRouter)
app.use('/api/v1/task',userTask)

  

export default app;


