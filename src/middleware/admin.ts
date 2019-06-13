import { HTTPError } from '@/helpers';

export function admin(req, res, next) {
  if (!req.user.isAdmin) return next(new HTTPError.Code403('Access denied.'))
  next();
}