import jwt from "jsonwebtoken";

export const token = (data) => {
  return jwt.sign(data, "weqwertyugfdsasdfghbvcxbnjytr", { expiresIn: "2h" });
};
