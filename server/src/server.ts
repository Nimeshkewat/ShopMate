import app from "./app.js";
import connectCloudinary from "./config/cloudinary.js";
import connectDb from "./config/db.js";

const port = process.env.PORT || 4000;
connectDb();
connectCloudinary();

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
