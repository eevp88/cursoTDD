import express from "express";
import config from "./config";
import axios from "axios";
const app = express();

const port = config.SERVER.port || 3000;

app.get("/", async (req, res) => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/users",
  );
  console.log(data);
  res.status(200).send(JSON.stringify(data));
});

app.post("/users", async (req, res) => {
  const newUser = req.body;
  console.log(newUser);
  res.status(201).send(JSON.stringify(newUser));
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
