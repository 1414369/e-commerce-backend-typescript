import { Router, Request, Response } from "express";
import usersRoute from "./users";
import productsRoute from "./products";
import productsCategoryRoute from "./product-category";

const routes = Router();

routes.use("/users", usersRoute);
routes.use("/products", productsRoute);
routes.use("/products-category", productsCategoryRoute);

export default routes;