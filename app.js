import express from "express"
import morgan from "morgan";
import cors from 'cors'
import cookieParser from "cookie-parser";
import userRouter from "./Router/user.route.js";
import userTask from "./Router/task.route.js";
const app = express();


app.use(cors({
  origin: "https://taskinforge.netlify.app/",
  credentials: true,
}));

app.options("*", cors());
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use('/api/v1',userRouter)
app.use('/api/v1/task',userTask)

export default app;


