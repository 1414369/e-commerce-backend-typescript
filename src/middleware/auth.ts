import { HTTPError } from '@/helpers';
const jwt = require('jsonwebtoken');
const config = require('config');

export function authenticate(req, res, next) {
  const token = req.header('x-auth-token');
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