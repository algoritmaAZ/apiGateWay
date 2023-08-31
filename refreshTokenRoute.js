import express from "express";
import axios from "axios";
import { refreshTokenMiddleware } from "./authMiddleware.js";
import dotenv from "dotenv";
dotenv.config();

export const refreshTokenRoute = express.Router();
const authService = process.env.AUTH_SERVICE;

refreshTokenRoute.use(refreshTokenMiddleware);

refreshTokenRoute.post("/user/refreshToken", async (req, res, next) => {
  try {
    const response = await axios.post(`${authService}/user/refreshToken`);
    res
      .status(response.status)
      .cookie("token", response.data.token)
      .cookie("refreshToken", response.data.refreshToken)
      .send(response.data);
  } catch (err) {
    res.status(err.response.status).send(err.response.data);
  }
});
