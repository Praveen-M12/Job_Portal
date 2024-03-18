//package import
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";

//file import
import connectDB from "./config/database.js";

//routes import
import testRoute from "./routes/testRoutes.js";
import authRoute from "./routes/authRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import userRoute from "./routes/userRoutes.js";
import jobsRoute from "./routes/jobsRoutes.js";

//env setup
dotenv.config();

//mongoose conn
connectDB();

//rest object
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hey! Welcome to our page");
});

app.use("/api/v1/test", testRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/job", jobsRoute);

//validation middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.DEV_MODE} mode on port no ${PORT}!`.bgBlue
  );
});
