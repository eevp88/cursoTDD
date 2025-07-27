import express from "express";
import config from "./config";
import axios from "axios";
import { post } from "./endpoints";
import { authenticate } from "./middleware";
const app = express();
const port = config.SERVER.port || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const postHandlers = post({ axios });
//app.get("/", usersHandlers.get);
app.post("/", authenticate, postHandlers.post);
//app.put("/:id", usersHandlers.put);
//app.delete("/:id", usersHandlers.delete);

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
