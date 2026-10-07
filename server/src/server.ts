import app from "./app.js";
import connectDb from "./config/db.js";

const port = process.env.PORT || 4000;

app.listen(port, () => {
  connectDb();
  console.log(`Server is running on port: ${port}`);
});
