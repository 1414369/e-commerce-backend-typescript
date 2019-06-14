import { Request } from "express"
import { iTokenData } from "@/api/users/model";
export interface iExtendedRequest extends Request {
    model: any,
    shoppingCart: any,
    product: any,
    user: iTokenData,
    params: {
        id: string
        productId: string
    }
}