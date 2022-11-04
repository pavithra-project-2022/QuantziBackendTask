import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import profileRoute from "./routes/profile.js";
import aggrigateRoute from "./routes/aggrigate.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect("mongodb+srv://mms:mms@cluster0.26hvrmo.mongodb.net/Quantzi?retryWrites=true&w=majority");
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};



mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});



//middlewares
app.use(cors({
  origin: "*",
}))
app.use(cookieParser())
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/profile", profileRoute);
app.use("/api/aggrigate",aggrigateRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(process.env.PORT || 7000, () => {
  connect();
  console.log("Connected to backend at 7000");
});