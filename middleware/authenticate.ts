/**
 * Middleware to authenticate user by user_id header.
 * Allows access only if user_id is 1, otherwise denies with 403.
 * @param req - Request object with header method
 * @param res - Response object with sendStatus method
 * @param next - Next middleware function
 */
export const authenticate = (req, res, next) => {
  const userId = req.header("user_id");
  if (userId !== '1') {
    return res.sendStatus(403);
  }
  next();
};
