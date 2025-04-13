import cluster from "cluster";
import os from "os";
import process from "process";
import "dotenv/config";
import app from "./app.js";
import cloudinary from "cloudinary";
import { connectDb } from "./config/db.conn.js";

const PORT = process.env.PORT || 10000;
const totalCpus = os.cpus().length;

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < totalCpus; i++) {
    cluster.fork();
  }

  // Restart worker when it dies
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Starting a new one...`);
    cluster.fork();
  });

} else {
  // Worker processes
  app.listen(PORT, async () => {
    await connectDb();
    console.log(`App is running at http://localhost:${PORT} in worker ${process.pid}`);
  });

  // CPU usage monitor
  setInterval(() => {
    const usage = process.cpuUsage(); // Returns object with user and system CPU time in microseconds
    const cpuPercent = ((usage.user + usage.system) / 1e6) / 5 * 100; // Estimating per 5 seconds

    if (cpuPercent > 70) {
      console.warn(`Worker ${process.pid} exceeded CPU usage: ${cpuPercent.toFixed(2)}%. Restarting...`);
      process.exit(); // Exits, master will restart it
    }
  }, 5000);
}
