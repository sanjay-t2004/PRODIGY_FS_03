import express from "express";
import { createCategory, deleteCategory, editCategory, getAllCategories, getOneCategory } from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.post('/create', createCategory);
categoryRouter.put('/edit/:id', editCategory);
categoryRouter.delete('/delete/:id', deleteCategory);
categoryRouter.get('/get', getAllCategories);
categoryRouter.get('/get/:id', getOneCategory);

export default categoryRouter;