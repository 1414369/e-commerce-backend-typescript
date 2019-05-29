import { Application, static as staticInit, Router } from "express";
import usersRoute from "./users";
import productsRoute from "./products";
import productsCategoryRoute from "./product-category";
import auth from "./auth";

export const apiRouter = Router();

apiRouter
    .use('/public', staticInit('public'))
    .use("/api/users", usersRoute)
    .use("/api/products/category", productsCategoryRoute)
    .use("/api/products", productsRoute)
    .use('/api/auth', auth)
