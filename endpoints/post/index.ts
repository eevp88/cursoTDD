
import type { Request, Response } from "express";
import type { AxiosInstance } from "axios";
/**
 * Returns handlers for post endpoints.
 * @param params - The dependencies for the handlers.
 * @param params.axios - HTTP client instance (Axios).
 * @returns Object with post handler.
 */
export const postHandlers = ({ axios }: { axios: AxiosInstance } ) => ({
  /**
   * Creates a new post if the userId exists.
   * Fetches users, checks if userId is valid, then creates the post.
   * Responds with 201 and post data if successful, 400 if userId not found.
   * @param req - Request object containing post data in body
   * @param res - Response object for sending status and data
   */
  post: async (req: Request, res: Response): Promise<void> => {
    const { data: users } = await axios.get(
      "https://jsonplaceholder.typicode.com/users",
    );
    const isFound = users.find((user: {id:number}) => user.id === req.body.userId);
    if (!isFound) {
      res.sendStatus(400);
      return;
    }
    const { data } = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      req.body,
    );
    res.status(201).send(data);
    return
  },
});
