const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // obtener el encabezado y el token
  const authHeader = req.headers["authorization"];
  if (authHeader == null) {
    res
      .status(400)
      .json({ status: "failed", error: "authorization not found" });
  }
  const token = authHeader.split(" ")[1];
  if (token == null) {
    res.status(400).json({ status: "failed", error: "token not found" });
  }
  jwt.verify(token, process.env.SECRET, (err, payload) => {
    if (err) {
      res.status(403).json({ status: "failed", error: "token does't match" });
    } else {
      req.payload = payload;
      next();
    }
  });
};

const verifyRefreshToken = (req, res, next) => {
  // obtener el encabezado y el token
  const authHeader = req.headers["authorization"];
  if (authHeader == null) {
    res
      .status(400)
      .json({ status: "failed", error: "authorization not found" });
  }
  const token = authHeader.split(" ")[1];
  if (token == null) {
    res.status(400).json({ status: "failed", error: "token not found" });
  }
  jwt.verify(token, process.env.REFRESH_SECRET, (err, payload) => {
    if (err) {
      res.status(403).json({ status: "failed", error: "token does't match" });
    } else {
      req.payload = payload;
      next();
    }
  });
};

const generateToken = (payload, refresh = false) => {
  if (refresh) {
    return jwt.sign({ role: payload[0].role }, process.env.REFRESH_SECRET, {
      expiresIn: "3m",
    });
  } else {
    return jwt.sign({ role: payload[0].role }, process.env.SECRET, {
      expiresIn: "1m",
    });
  }
};

module.exports = { verifyToken, verifyRefreshToken, generateToken };



