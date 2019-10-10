import { HTTPError } from '@/helpers';
import { iTokenData } from '@/api/users/model';
const jwt = require('jsonwebtoken');
const config = require('config');

export function authenticate(req, res, next) {
  const bearerToken = req.header('x-auth-token');
  const token = bearerToken.split(" ")[1];

  if (!token) return next(new HTTPError.Code401('Access denied. No token provided.'));

  try {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    req.user = decoded;
    next();
  }
  catch (ex) {
    return next(new HTTPError.Code400('Invalid token.'));
  }
}

export function authenticateSocket(token: string): iTokenData {
  try {
    const decoded: iTokenData = jwt.verify(token, config.get('jwtPrivateKey'));
    return decoded;
  }
  catch (ex) {
    return null;
  }
}