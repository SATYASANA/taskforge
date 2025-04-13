import express from "express"
import morgan from "morgan";

import cookieParser from "cookie-parser";
import userRouter from "./Router/user.route.js";
import userTask from "./Router/task.route.js";
const app = express();

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use('/api/v1',userRouter)
app.use('/api/v1/task',userTask)
app.get("/heavy", (req, res) => {
    let count = 0;
    for (let i = 0; i < 100000000000000000; i++) {
      count += i;
    }
    res.send("Heavy calculation done 🧠");
  });
  

export default app;


