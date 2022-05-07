import type { FastifyRequest, FastifyReply } from "fastify";
import { find } from "./sessions";

const secret = "secret_8THB2z6RB1CvTc0sqIDditbyNWUqWlQs0f41Drikklx";
const tokenURL = "https://api.notion.com/v1/oauth/token";

export default async function token(req: FastifyRequest, res: FastifyReply) {
  const { code_verifier, client_id, code, ...extra } = req.body as any;

  const session = find(code, code_verifier);

  if (!session) {
    return res.status(400).send("invalid_grant");
  }

  const response = await fetch(tokenURL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${client_id}:${secret}`).toString(
        "base64"
      )}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // client_id,
      code,
      //...extra,
      grant_type: "authorization_code",
      redirect_uri: session.redirect_uri,
    }),
  });

  return response.json();
}
