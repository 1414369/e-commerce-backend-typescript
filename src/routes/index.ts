import { Router, Request, Response } from "express";
import usersRoute from "./users.route";

const routes = Router();

routes.use("/users", usersRoute);

export default routes;