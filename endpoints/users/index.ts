type Req = {
  body: any;
  params: { id: string };
};

type Res = {
  status: (code: number) => Res;
  send: (data?: any) => void;
  sendStatus: (code: number) => void;
};

export const handlers = ({ axios }: { axios: any }) => ({
  get: async (req: Req, res: Res) => {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/users",
    );
    res.status(200).send(JSON.stringify(data));
  },
  post: async (req: Req, res: Res) => {
    const newUser = req.body;
    const { data } = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      newUser,
    );
    res.status(201).send(data);
  },
  put: async (req: Req, res: Res) => {
    const { id } = req.params;
    const newUser = req.body;
    await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      newUser,
    );
    res.sendStatus(204);
  },
  delete: async (req: Req, res: Res) => {
    const { id } = req.params;
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    res.sendStatus(204);
  },
});
