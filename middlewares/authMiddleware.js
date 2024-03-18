import JWT from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization; // Corrected spelling of headers
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    // Fixed condition
    return res.status(401).json({ message: "Auth failed" }); // Return response
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = JWT.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Auth failed" }); // Return response
  }
};

export default userAuth;
