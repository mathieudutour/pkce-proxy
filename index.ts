import fastify from "fastify";

import authorize from "./src/authorize";
import token from "./src/token";
import refreshToken from "./src/refresh-token";
import redirect from "./src/redirect";

const PORT = parseInt(process.env.PORT || "5000");
const HOST = process.env.HOST || "0.0.0.0";

const server = fastify();

// redirect to https
server.addHook("onRequest", (req, res, done) => {
  if (req.headers["x-forwarded-proto"] !== "https") {
    res.redirect(302, "https://" + req.hostname + req.originalUrl);
  } else {
    res.header(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    res.header(
      "Content-Security-Policy",
      "default-src 'none'; base-uri 'none'; object-src 'none'; form-action 'none'; frame-ancestors 'none'; require-trusted-types-for 'script';"
    );
    res.header("X-Content-Type-Options", "nosniff");
    res.header("X-Frame-Options", "DENY");
    res.header("X-XSS-Protection", "1; mode=block");
    res.header("Referrer-Policy", "no-referrer");
    done();
  }
});

server
  .get("/", async (req, res) => {
    res.header("Content-Type", "text/html");
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
    await server.listen({ port: PORT, host: HOST });
    console.log(`started listening on ${HOST}:${PORT}`);
  } catch (err) {
    console.error(err);
    server.log.error(err);
    process.exit(1);
  }
};
start();
