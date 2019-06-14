import { HTTPError } from '@/helpers';
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