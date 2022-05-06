import express from "express";
import bodyParser from "body-parser";

import authorize from "./src/authorize";
import token from "./src/token";
import redirect from "./src/redirect";

const PORT = process.env.PORT || 5000;
const server = express();

server
  .get("/", (req, res) => res.send("Alive"))
  .get("/authorize", authorize)
  .get("/redirect", redirect)
  .use(bodyParser.json())
  .post("/token", token)
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
