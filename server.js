import express from 'express';
import cors from 'cors';
const morgan = require('morgan');
require("dotenv").config();

// create express app
const app = express();

// apply middlewares (any code thet runs before any response to the client)
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// this is a customized middleware
app.use((req, res, next) => {
  console.log("This is my own middleware...");
  next();
});

app.get("/", (req, res) => {
  res.send('you hit the server endopint');
});

// port
 const port = process.env.PORT || 8000;

 app.listen(port, () => console.log(`Server is running on port ${port}`));