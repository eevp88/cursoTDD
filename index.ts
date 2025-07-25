import express from "express";
import config from "./config";
import axios from "axios";
const app = express();

const port = config.SERVER.port || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/users",
  );
  console.log(data);
  res.status(200).send(JSON.stringify(data));
});

app.post("/", async (req, res) => {
  const newUser = req.body;
  const { data } = await axios.post(
    "https://jsonplaceholder.typicode.com/users",
    newUser,
  );
  res.status(201).send(data);
});

app.put("/:id", async (req, res) => {
  const { id } = req.params;
  const newUser = req.body;
  await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, newUser);
  res.sendStatus(204);
});

app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
