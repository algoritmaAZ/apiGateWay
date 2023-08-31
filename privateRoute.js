import express from "express";
import axios from "axios";
import { privateRouteMiddleware } from "./authMiddleware.js";
import dotenv from "dotenv";
dotenv.config();

export const privateRoute = express.Router();
const userService = process.env.USER_SERVICE;

privateRoute.use(privateRouteMiddleware);
privateRoute.get("/user/:username", async (req, res, next) => {
  try {
    const username = req.params.username;
    const response = await axios.get(`${userService}/user/${username}`);
    res.send(response.data);
  } catch (err) {
    res.status(err.response.status).send(err.response.data);
  }
});
