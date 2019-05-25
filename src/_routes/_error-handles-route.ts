import { Router } from "express";
import { ErrorHandle } from "@/middleware";

export const errorHandlesRoute = Router();

errorHandlesRoute.use(ErrorHandle.notFoundError);
errorHandlesRoute.use(ErrorHandle.clientError);
errorHandlesRoute.use(ErrorHandle.serverError);
