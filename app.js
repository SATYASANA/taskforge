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


const allowedOrigins = [
  "http://localhost:5173",                  // local dev
  "https://your-frontend-site.netlify.app" // Netlify domain
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use('/api/v1',userRouter)
app.use('/api/v1/task',userTask)

export default app;


