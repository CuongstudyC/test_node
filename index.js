const express = require("express");
//import express from 'express'; // dùng khi đuôi file là mjs
const user = require("./routes/user");
const product = require("./routes/product");
const readnew = require("./routes/readNew");
const carousel = require("./routes/Carousel");
const instagram = require("./routes/instagram");
const category = require("./routes/category");
const cart = require("./routes/cart");

const { expressjwt } = require("express-jwt");
const cors = require("cors");
const { key } = require("./Config/config");

const unless = [
  "/",
  "/user/login",
  "/user/create",
  /^\/product*/,
  "/readNew",
  "/carousel",
  "/instagram",
  "/category",
  "*",
];

const token = expressjwt({
  secret: key,
  algorithms: ["HS256"],
}).unless({ path: unless });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(token);

app.use("/product", product);
app.use("/user", user);
app.use("/readNew", readnew);
app.use("/carousel", carousel);
app.use("/instagram", instagram);
app.use("/category",category);
app.use("/cart",cart);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("*", (req, res) => {
  res.send("Path is not exist");
});

app.listen(3000, () => {
  console.log("Chào mừng đến app 3000");
  console.log("http://localhost:3000/");
});
