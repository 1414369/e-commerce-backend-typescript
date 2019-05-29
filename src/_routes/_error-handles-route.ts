import { Application } from "express";
import { ErrorHandle } from "@/middleware";

export function errorHandlesRouteInit(app: Application) {
    app.use(ErrorHandle.notFoundError);
    app.use(ErrorHandle.clientError);
    app.use(ErrorHandle.serverError);
}


