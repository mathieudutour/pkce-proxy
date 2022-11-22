import fastify from "fastify";

import authorize from "./src/authorize";
import token from "./src/token";
import refreshToken from "./src/refresh-token";
import redirect from "./src/redirect";

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "0.0.0.0";

const server = fastify();

server
  .get("/", async (req, res) => {
    res.header("Content-Type", "text/html");
    res.header(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    res.send(`
    <titl>OAuth PKCE Proxy</titl>
    <h1>OAuth PKCE Proxy</h1>
    <p>This server is required to allow Raycast to connect to services that do not support the PKCE OAuth flow (which is the most secure one for applications). Ideally, this proxy should not be needed but until more services get up to speed with the latest security recommendations, this is the state that we are in.</p>
    <p><b>No data is stored in the server.</b> In fact, it doesn't even have a database.</p>
    <p>See <a href="https://github.com/mathieudutour/pkce-proxy">https://github.com/mathieudutour/pkce-proxy</a> for more details.</p>
`);
  })
  .get("/authorize", authorize)
  .get("/redirect", redirect)
  .post("/token", token)
  .post("/refresh-token", refreshToken);

const start = async () => {
  try {
    await server.listen(PORT, HOST);
    console.log(`started listening on ${HOST}:${PORT}`);
  } catch (err) {
    console.error(err);
    server.log.error(err);
    process.exit(1);
  }
};
start();
