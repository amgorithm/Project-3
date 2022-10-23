import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.SECRET;

export default function (req, res, next) {
  let token = req.get("Authorization") || req.query.token || req.body.token;

  if (token) {
    token = token.replace("Bearer ", "");
    jwt.verify(token, SECRET, function (err, decoded) {
      if (err) {
        next(err);
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } else {
    next();
  }
}
