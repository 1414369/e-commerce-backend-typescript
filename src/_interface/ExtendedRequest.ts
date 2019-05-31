import { Request } from "express"
export interface iExtendedRequest extends Request {
    model: any,
    shoppingCart: any,
    product: any,
    params: {
        id: string
        productId: string
    }
}