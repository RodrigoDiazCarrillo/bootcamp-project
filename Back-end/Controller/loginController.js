const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verifyRefreshToken, generateToken } = require("../lib/utils");
const Model = require("../Model/memberModel");
const router = express.Router();

const bodyParser = require('body-parser')


var app = express()

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))

// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))

// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }))


// Register
router.post("/new", async (req, res) => {
  // const data = new Model({
  //   email: req.body.email,
  //   password: await bcrypt.hash(req.body.password, 10),
  //   role: req.body.role,
  const data = new Model({
    first_name:req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10)

  });

  try {
    await data.save().then((dataToSave) => res.status(200).json(dataToSave));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Refresh
router.post("/refresh", verifyRefreshToken, async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    if (authHeader == null) {
      res
        .status(400)
        .json({ status: "failed", error: "authorization not found" });
    }
    const token = authHeader.split(" ")[1];
    let payload = [jwt.decode(token)];
    // console.log(payload);
    res.status(200).json({
      status: "success",
      token: generateToken(payload, false),
      refresh_token: generateToken(payload, true),
      error: null,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// login
router.post("/",async (req, res) => {
  console.log(req);
  try {
    Model.find({ email: req.body.email })
      .exec()
      .then((result) => {
        if (result.length > 0) {
    
          bcrypt.compare(
            req.body.password,
            result[0].password,
            (error, response) => {
              if (error) {
                res.status(500).json({ message: error.message });
              } else if (response) {
                res.status(200).json({
                  status: "success",
                  token: generateToken(result, false),
                  refresh_token: generateToken(result, true),
                  email: result[0].email,
                  first_name: result[0].first_name,
                  last_name: result[0].last_name,
                  role: result[0].role,
                  id: result[0].id,
                  error: error || null,
                });
              } else {
                res
                  .status(200)
                  .json({ message: "incorrect username or password" });
              }
            }
          );
        } else {
          res.status(200).json({ message: "Incorrect username or password" });
        }
      });
    // change this to previously see the password
    // res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
