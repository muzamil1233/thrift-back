import express from "express";
import { createOrder, getMyOrders } from "../Controller/order.controller.js";
import { authorize } from "../Middleware/authorize.js"; // same middleware you use in Bag routes

const Orderrouter = express.Router();

Orderrouter.post("/create", authorize, createOrder);
Orderrouter.get("/myorders", authorize, getMyOrders);

export default Orderrouter;