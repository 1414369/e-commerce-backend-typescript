import { Request, Response } from "express";
import { responseMessage } from "@/_common";

export class productsController {
    static getAllProducts(req: Request, res: Response) {
        res.status(200).send(responseMessage.BAD_REQUEST);
    }

    static getProductsById(req: Request, res: Response) {
        res.status(200).send(responseMessage.BAD_REQUEST);
    }
}

