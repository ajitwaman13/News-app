import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ message: "No token provided" });

    console.log("Header Authorization:", header);

    const token = header.split(" ")[1];
    console.log("auth token", token);
    const decoded = jwt.verify(token, "weqwertyugfdsasdfghbvcxbnjytr");
    // console.log("decoded token:", decoded);
    req.userId = decoded.id;

    next();
  } catch (e) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
