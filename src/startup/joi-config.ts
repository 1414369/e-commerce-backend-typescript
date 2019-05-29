import * as Joi from 'Joi'
import joiObjectid from 'joi-objectid'

export function joiConfigInit() {
  Joi["objectId"] = joiObjectid(Joi);
}

