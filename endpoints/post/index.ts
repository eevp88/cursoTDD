/**
 * Handlers for post endpoints. Uses injected axios for HTTP requests.
 * @param axios - HTTP client instance
 * @returns Object with post-related route handlers
 */
export const postHandlers = ({ axios }) => ({
  /**
   * Creates a new post if the userId exists.
   * Fetches users, checks if userId is valid, then creates the post.
   * Responds with 201 and post data if successful, 400 if userId not found.
   * @param req - Request object containing post data in body
   * @param res - Response object for sending status and data
   */
  post: async (req, res) => {
    const { data: users } = await axios.get(
      "https://jsonplaceholder.typicode.com/users",
    );
    const isFound = users.find((user) => user.id === req.body.userId);
    if (!isFound) {
      res.sendStatus(400);
      return;
    }
    const { data } = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      req.body,
    );
    res.status(201).send(data);
  },
});
