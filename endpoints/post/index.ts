export const postHandlers = ({ axios }) => ({
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
