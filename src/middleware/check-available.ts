import { HTTPError } from '@/helpers';
import { iExtendedRequest } from '@/_interface';

export function checkAvailable(req: iExtendedRequest, res, next) {
  if (req.user.isAdmin) return next();

  console.log(req.model.user._id.toString());
  if (req.model.user._id != req.user._id) {
    return next(new HTTPError.Code403('Access denied.'))
  }

  return next();
}