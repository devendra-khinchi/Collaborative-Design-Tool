import "dotenv/config.js";
import connectDB from "./utils/dbConfig.js";
import { httpServer } from "./app.js";

connectDB()
  .then(() => {
    httpServer.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO DB connection failed !!! ", err);
  });
