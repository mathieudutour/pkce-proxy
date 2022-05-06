import express from "express";
import authorize from "./src/authorize";
import token from "./src/token";

const PORT = process.env.PORT || 5000;
const server = express();

server
  .get("/", (req, res) => res.send("Alive"))
  .get("/authorize", authorize)
  .post("/token", token)
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
