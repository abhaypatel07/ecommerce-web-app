import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import cors from "cors";

//configure env
dotenv.config();

//database config
connectDB();

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);
// direct route file na nam j aave

//rest api
app.get("/", (req, res) => {
  res.send(`<h1>hello</h1>`);
});

//PORT
const PORT = process.env.PORT || 8080;

//run litsen
app.listen(PORT, () => {
  console.log(`server are listen on ${PORT}`.bgCyan.white);
});
