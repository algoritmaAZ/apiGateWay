import axios from "axios";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const sercretKey = process.env.SECRET_KEY;
export const privateRouteMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).send({ errors: "Unauthorized" });
    }

    if (token) {
      jwt.verify(token, sercretKey); // if verfy here we don't need to validate in services
      axios.defaults.headers["Cookie"] = `token=${token}`;
      axios.defaults.withCredentials = true;
      next();
    }
  } catch (err) {
    next(err);
  }
};

export const refreshTokenMiddleware = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      res.status(401).send({ errors: "Unauthorized" });
    }

    if (refreshToken) {
      jwt.verify(refreshToken, sercretKey); // if implement here so we don need to validate token in every services
      axios.defaults.headers["Cookie"] = `refreshToken=${refreshToken}`;
      axios.defaults.withCredentials = true;
      next();
    }
  } catch (err) {
    next(err);
  }
};
