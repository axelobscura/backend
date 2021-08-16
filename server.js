import express from 'express';
import cors from 'cors';
import { readdirSync } from 'fs';
import mongoose from 'mongoose';
const morgan = require('morgan');
require("dotenv").config();

// create express app
const app = express();

// db
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(() => console.log('DB CONNECT'))
.catch((err) => console.log('DB CONNECTION ERR => ', err));

// apply middlewares (any code thet runs before any response to the client)
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


// this is a customized middleware
app.use((req, res, next) => {
  console.log("This is my own middleware...");
  next();
});


// route
readdirSync('./routes').map((r) => 
  app.use('/api', require(`./routes/${r}`))
);

// port
 const port = process.env.PORT || 8000;

 app.listen(port, () => console.log(`Server is running on port ${port}`));
