import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import hotelsRoute from "./routes/hotelRoute.js";
import roomsRoute from "./routes/roomRoute.js";
import usersRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";

const app = express();
dotenv.config();

// const connect = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO);
//     console.log("Connected to mongoDB.");
//   } catch (error) {
//     throw error;
//     // console.log(error);
//   }
// };

mongoose.connect(process.env.MONGO).then(() => {
  console.log("Mongo Database connection successful...😎💥");
});
// .catch((err/ => console.log('ERROR'));

mongoose.set("strictQuery", true);

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

//middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/hotels", hotelsRoute);
app.use("/api/v1/rooms", roomsRoute);

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

// app.listen(8800, () => {
//   connect();
//   console.log("Connected to backend.");
// });

const port = 5000 || process.env.PORT;
const server = app.listen(port, () => {
  console.log(`App is running at port ${port}...`);
});
