import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
const mongoose = require('mongoose');
import cors from "cors"
import path from "path"
const passport = require('passport')
const db = require('./src/config/keys').mongoURI

const users = require("./src/routes/api/users")


mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err: any) => console.log(err));

dotenv.config();

const PORT = process.env.PORT || 8000;
const app: Express = express();

app.use(cors())
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize())
require('./src/config/passport')(passport)

// routes 
app.use("/api/users", users)
app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Hello from the TypeScript world!</h1>');
});


app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));