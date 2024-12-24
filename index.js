import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./db/db.js";
import userRoute from "./routes/user.route.js";
import accountRoute from "./routes/account.route.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// middlewares - will get executed everytime for every http method
app.use(bodyParser.json());

// routes middleware
app.use("/api/v1/user", userRoute);
app.use("/api/v1/account", accountRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connectDB();
  console.log("App is running on port 3000");
});
