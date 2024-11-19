import jwt from "jsonwebtoken";

// Middleware to verify the JWT token
function authenticator(req, res, next) {
  // Get the token from the Authorization header
  const token = req.headers.authorization.toString().split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Authorization token is required",
      status: 0,
    });
  }

  // Verify the token
  jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Invalid or expired token, please log in",
        status: 0,
      });
    }

    // Attach the userId to the request object for further use
    req.body.user = decoded.userId;
    next(); // Proceed to the next middleware or route
  });
}

export default authenticator;
