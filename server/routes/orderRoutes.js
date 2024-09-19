import express from "express";
import { createOrder, deleteOrder, editOrder, getAllOrders, getOneOrder, orderThanos } from "../controllers/orderControllers.js";

const orderRouter = express.Router();

orderRouter.post('/create', createOrder);
orderRouter.put('/edit/:id', editOrder);
orderRouter.delete('/delete/:id', deleteOrder);
orderRouter.get('/get', getAllOrders);
orderRouter.get('/get/:id', getOneOrder)
orderRouter.delete('/deleteAll', orderThanos);


export default orderRouter;