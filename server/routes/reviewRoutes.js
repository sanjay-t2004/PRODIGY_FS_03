import express from "express";
import { createReview, deleteReview, editReview, getAllReviews, getOneReview } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post('/create', createReview);

reviewRouter.get('/get', getAllReviews);

reviewRouter.get('/get/:id', getOneReview);

reviewRouter.put('/edit/:id', editReview);

reviewRouter.delete('/delete/:id', deleteReview);



export default reviewRouter;