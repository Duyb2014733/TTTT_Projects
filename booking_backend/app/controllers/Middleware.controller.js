const jwt = require("jsonwebtoken");

const MiddlewareController = {
  // Middleware to verify the token
  verifyToken: (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
      return res.status(401).json("You're not authenticated");
    }

    const accessToken = token.split(" ")[1];

    jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, khachhang) => {
      if (err) {
        return res.status(403).json("Token is not valid");
      }

      req.khachhang = khachhang;
      next();
    });
  },

  // Middleware to verify the token and admin privileges
  verifyTokenAndAdmin: (req, res, next) => {
    MiddlewareController.verifyToken(req, res, (err) => {
      if (err) {
        return next(err);
      }

      if (req.khachhang._id === req.params._id || req.khachhang.admin) {
        next();
      } else {
        return res
          .status(403)
          .json("You're not allowed to perform this action");
      }
    });
  },
};

module.exports = MiddlewareController;
