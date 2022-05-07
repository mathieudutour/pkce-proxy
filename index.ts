import fastify from "fastify";

import authorize from "./src/authorize";
import token from "./src/token";
import redirect from "./src/redirect";

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "0.0.0.0";

const server = fastify();

server
  .get("/", async (req, res) => "Alive")
  .get("/authorize", authorize)
  .get("/redirect", redirect)
  .post("/token", token);

const start = async () => {
  try {
    await server.listen(PORT, HOST);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
