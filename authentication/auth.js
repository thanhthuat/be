import jwt from "jsonwebtoken";

export default function checkToken(req, res, next) {
  // by pass login register

  if (
    req.url.toLowerCase().trim() == "/user/login".toLowerCase().trim() ||
    req.url.toLowerCase().trim() == "/user/register".toLowerCase().trim()
  ) {
    next();
    return;
  }
  // other requests
  // get and validate token

  const token = req.headers?.authorization?.split(" ")[1];
  try {
    const jwtObject = jwt.verify(token, process.env.JWT_SECRET);
    const isExpired = Date.now() >= jwtObject.exp * 1000;
    if (isExpired) {
      res.status(500).json({
        mesage: "Token is expired",
      });
      res.end();
    } else {
      next();
      return
    }
  } catch (error) {
    debugger
    res.status(500).json({
      mesage: error.message,
    });
  }
}
