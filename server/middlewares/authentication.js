const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res
        .status(401)
        .json({ message: "Authorization header is missing" });
    }

    const token = req.headers.authorization.split(" ")[1];

    if (token) {
      let decodedData = jwt.verify(token, "1234");

      req.userId = decodedData?.id;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = authentication;
