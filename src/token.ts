import type { FastifyRequest, FastifyReply } from "fastify";
import { find, consume } from "./sessions";
import { TOKEN_URL, CLIENT_SECRET, PROXY_REDIRECT_URL } from "./constants";

export default async function token(req: FastifyRequest, res: FastifyReply) {
  const { code_verifier, client_id, code, ...extra } = req.body as any;

  const session = find(code, code_verifier);

  if (!session) {
    res.status(400);
    return { error: "invalid_grant" };
  }

  consume(session);

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${client_id}:${CLIENT_SECRET}`
      ).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id,
      code,
      ...extra,
      redirect_uri: PROXY_REDIRECT_URL,
    }),
  });

  res.status(response.status);

  return response.json();
}
