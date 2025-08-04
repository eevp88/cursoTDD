import type { Request, Response, NextFunction } from "express";
/**
 * Express middleware to authenticate user by the 'user_id' header.
 *
 * Allows access only if user_id is '1', otherwise denies with 403 Forbidden.
 *
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next middleware function
 * @returns void | Response Returns void or a response with status 403
 */
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void | Response => {
  const userId = req.header("user_id");
  if (userId !== '1') {
    res.sendStatus(403);
    return
  }
  next();
};