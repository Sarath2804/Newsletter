const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const csv = require("csv-parser");
const fs = require("fs");
const results = [];
var array = [];



const UserRoute = require("./routes/user");
const SenderRoute = require("./routes/sender");
const ReceiverRoute = require("./routes/receiver");
// const { resourceLimits } = require("worker_threads");

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DB connection successful"))
.catch((err) => {
    console.log(err);
  });

app.use(express.json());  
app.use("/api/users", UserRoute);
// app.use("/api/sender", SenderRoute); 


app.listen(5000, () =>{
    console.log("Backend Server is running!!");
});



