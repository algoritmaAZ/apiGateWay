import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { privateRoute } from "./privateRoute.js";
import { refreshTokenRoute } from "./refreshTokenRoute.js";

dotenv.config();

const port = process.env.PORT;
const authService = process.env.AUTH_SERVICE;

const apiGateWay = express();

apiGateWay.use(cookieParser());
apiGateWay.use(express.json());

apiGateWay.post("/user/login", async (req, res, next) => {
  try {
    const response = await axios.post(`${authService}/user/login`, req.body);

    res
      .status(response.status)
      .cookie("token", response.data.token)
      .cookie("refreshToken", response.data.refreshToken)
      .send(response.data);
  } catch (err) {
    res.status(err.response.status).send(err.response.data);
  }
});
apiGateWay.use(privateRoute);
apiGateWay.use(refreshTokenRoute);

apiGateWay.listen(port, () => console.log(`apiGateWay run on port ${port}`));
