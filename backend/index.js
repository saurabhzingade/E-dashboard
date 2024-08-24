const express = require("express");
const cors = require("cors");

// const mongoose = require("mongoose");
require("./db/config");
const app = express();
const User = require("./db/User");

const Product = require("./db/Product");

const Jwt = require("jsonwebtoken");
const jwtKey = "e-comm";

app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      resp.send({ result: "Soemthing went wrong" });
    }
    resp.send({ result, auth: token });
  });
});

app.post("/add-product", verifyToken, async (req, resp) => {
  let product = new Product(req.body);
  let result = await product.save();
  resp.send(result);
});

app.post("/login", async (req, resp) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          resp.send({ result: "Soemthing went wrong" });
        }
        resp.send({ user, auth: token });
      });
    } else {
      resp.send({ result: "No User Found" });
    }
  } else {
    resp.send({ result: "Enter Email or Password" });
  }
});

// const connectDB = async () => {
//   mongoose.connect("mongodb://localhost:27017/e-comm");
//   const productSchema = new mongoose.Schema({});
//   const product = mongoose.model("products", productSchema);
//   const data = await product.find();
//   console.warn(data);
// };

// connectDB();

app.get("/products", verifyToken, async (req, resp) => {
  const products = await Product.find();
  if (products.length > 0) {
    resp.send(products);
  } else {
    resp.send({ result: "No Products found" });
  }
});

app.delete("/product/:id", verifyToken, async (req, resp) => {
  let result = await Product.deleteOne({ _id: req.params.id });
  resp.send(result);
});

app.get("/product/:id", verifyToken, async (req, resp) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ res: "Nothing FOund" });
  }
});

app.put("/product/:id", verifyToken, async (req, resp) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  resp.send(result);
});

app.get("/search/:key", verifyToken, async (req, resp) => {
  let result = await Product.find({
    $or: [
      {
        name: { $regex: req.params.key },
      },
      {
        company: { $regex: req.params.key },
      },
      {
        category: { $regex: req.params.key },
      },
    ],
  });
  resp.send(result);
});

function verifyToken(req, resp, next) {
  console.warn(req.headers["authorization"]);
  let token = req.headers["authorization"];
  if (token) {
    Jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        resp.send("No Token Found");
      } else {
        next();
      }
    });
  } else {
    resp.send("No Token Found");
  }
}

app.listen(5000);
