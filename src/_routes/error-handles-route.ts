import { Router } from "express";
import usersRoute from "./users";
import productsRoute from "./products";
import productsCategoryRoute from "./product-category";

export const errorHandlesRoute = Router();

errorHandlesRoute.use(usersRoute);
errorHandlesRoute.use(productsRoute);
errorHandlesRoute.use(productsCategoryRoute);
