import "dotenv/config";
import app from "./app.js";
import cloudinary from "cloudinary";
import { connectDb } from "./config/db.conn.js";

const PORT = process.env.PORT || 10000;

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(PORT, '0.0.0.0', async () => {
  await connectDb();
  console.log(`App is running on port ${PORT}`);
});
