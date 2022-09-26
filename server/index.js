import express from "express";
import bodyParser from "body-parser";
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config();

const app = express();

// middlewares
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

// routes


app.listen(process.env.PORT, ()=> {
    console.log(`server running at port ${process.env.PORT}`)
})