import express from "express";
import "./Database/Config.js";
import User from "./Database/User.js";
import cors from "cors";
import product from "./Database/Product.js";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";

const jwtKey = "e-commKey";
// !verify token
const verifyToken = (req, resp, next) => {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        resp.status(401).send({ result: "Please provide a valid token" });
      } else {
        next();
      }
    });
  } else {
    resp.status(403).send({ result: "Please add a token with header" });
  }
};


const app = express();
app.use(express.json());
app.use(cors());
// !register api
app.post("/register", async (req, res) => {
  const user = new User(req.body);
  let result = await user.save();
  let resulta = result.toObject();
  delete resulta.password;
  jwt.sign({ resulta }, jwtKey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      res.send("something went wrong in token generate");
    } else {
      res.send({ resulta, auth: token });
    }
  });
});
// ! login api
app.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    let result = await User.findOne(req.body).select("-password");
    if (result) {
      jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res.send("something went wrong in token generation");
        } else {
          res.send({ result, auth: token });
        }
      });
    } else {
      res.send({ result: "Please register yourself" });
    }
  } else {
    res.send("please Enter correct details");
  }
});
// !ADD PRODUCT api
app.post("/add",verifyToken ,async (req, resp) => {
  const Product = new product(req.body);
  const result = await Product.save();
  resp.send(result);
});
// !PRoducts list api
app.get("/products",verifyToken, async (req, resp) => {
  let products = await product.find({});
  if (products.length > 0) {
    resp.send(products);
  } else {
    resp.send({ result: "No products found" });
  }
});
// !Delete api
app.delete("/delete/:id",verifyToken, async (req, resp) => {
  let id = req.params.id;
  id = new ObjectId(id);
  const result = await product.deleteOne({ _id: id });
  resp.send(result);
});
// !get single product for update
app.get("/product/:id",verifyToken, async (req, resp) => {
  let id = req.params.id;
  id = new ObjectId(id);
  let result = await product.findOne({ _id: id });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "Product not found." });
  }
});
//! Update Api
app.put("/product/:id",verifyToken, async (req, resp) => {
  let id = req.params.id;
  id = new ObjectId(id);
  const filter = { _id: id };
  const update = { $set: req.body };
  let result = await product.updateOne(filter, update);
  resp.send(result);
});
// !search api
app.get("/search/:key", verifyToken, async (req, resp) => {
  const key = req.params.key;
  let search = {
    $or: [
      { name: { $regex: key, $options: "i" } },
      { company: { $regex: key, $options: "i" } },
    ],
  };
  let result = await product.find(search);
  resp.send(result);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
