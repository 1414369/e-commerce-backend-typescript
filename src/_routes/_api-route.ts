import { Router, static as staticInit } from "express";
import usersRoute from "./users";
import productsRoute from "./products";
import productsCategoryRoute from "./product-category";
import auth from "./auth";

export const apiRoute = Router();

apiRoute.use('/public', staticInit('public'));
apiRoute.use("/api/users", usersRoute);
apiRoute.use("/api/products/category", productsCategoryRoute);
apiRoute.use("/api/products", productsRoute);
apiRoute.use('/api/auth', auth);
