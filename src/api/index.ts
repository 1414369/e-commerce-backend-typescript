import { static as staticInit, Router } from "express";
import usersRoute from "./users";
import productsRoute from "./products";
import ordersRoute from "./orders";
import shoppingCartRoute from "./shopping-cart";
import auth from "./auth";

export const apiRouter = Router();

apiRouter
    .use('/public', staticInit('public'))
    .use("/api/users", usersRoute)
    .use("/api/products", productsRoute)
    .use("/api/orders", ordersRoute)
    .use('/api/auth', auth)
    .use('/api/shopping-carts', shoppingCartRoute)
