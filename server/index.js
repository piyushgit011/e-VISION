import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
import UserRoute from './routes/UserRoute.js'
import workRoute from './routes/workRoute.js'

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to the db");
  })
  .catch((err) => {
    console.log(err);
  });

app.use('/user', UserRoute);
app.use('/work', workRoute);

app.listen(process.env.PORT, () => {
  console.log(`server running at port ${process.env.PORT}`);
});
