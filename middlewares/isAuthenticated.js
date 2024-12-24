import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization; // returns a string like 'Bearer eyJhbkalkadkiandka.....'

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({
      message: "Access denied. Missing or invalid authorization token.",
      success: false,
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    // returns decoded payload
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }

    // attaching paylod (userId) to req object
    req.id = decode.userId;
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Something went wrong",
      success: false,
    });
  }
};
