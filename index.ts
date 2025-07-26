import express from "express";
import config from "./config";
import axios from "axios";
import { users } from "./endpoints";
const app = express();
const port = config.SERVER.port || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const usersHandlers = users({ axios });
app.get("/", usersHandlers.get);
app.post("/", usersHandlers.post);
app.put("/:id", usersHandlers.put);
app.delete("/:id", usersHandlers.delete);

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
