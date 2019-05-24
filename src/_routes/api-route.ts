import { Router, Request, Response } from "express";
import usersRoute from "./users";
import productsRoute from "./products";
import productsCategoryRoute from "./product-category";

export const apiRoute = Router();

apiRoute.use("/users", usersRoute);
apiRoute.use("/products", productsRoute);
apiRoute.use("/products-category", productsCategoryRoute);