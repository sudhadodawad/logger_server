// server.js
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const database = require("./models/database");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use("/", routes);
// Connect to MongoDB
const connectDB = () => {
  try {
    mongoose.connect("mongodb+srv://sudhadodawad97:O4Z8T4pdBwmfbgLT@cluster0.aaaypjj.mongodb.net/?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("db connected");
  } catch (error) {
    console.log(error.message);
  }
};



app.listen(3001, () => {
  console.log("Server is running on port 3001");
  connectDB();
});
