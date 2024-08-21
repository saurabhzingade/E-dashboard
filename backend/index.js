const express = require("express");
const cors = require("cors");

// const mongoose = require("mongoose");
require("./db/config");
const app = express();
const User = require("./db/User");

app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {
  let user = new User(req.body);
  let result = await user.save();
  resp.send(result);
});

// const connectDB = async () => {
//   mongoose.connect("mongodb://localhost:27017/e-comm");
//   const productSchema = new mongoose.Schema({});
//   const product = mongoose.model("products", productSchema);
//   const data = await product.find();
//   console.warn(data);
// };

// connectDB();

app.listen(5000);
