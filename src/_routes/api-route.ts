import { Router, Request, Response, static as staticInit } from "express";
import usersRoute from "./users";
import productsRoute from "./products";
import productsCategoryRoute from "./product-category";

export const apiRoute = Router();

apiRoute.use('/public', staticInit('public'));
apiRoute.use("/api/users", usersRoute);
apiRoute.use("/api/products/category", productsCategoryRoute);
apiRoute.use("/api/products", productsRoute);