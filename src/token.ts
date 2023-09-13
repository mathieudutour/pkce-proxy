import type { FastifyRequest, FastifyReply } from "fastify";
import { find, consume } from "./sessions";
import {
  TOKEN_URL,
  CLIENT_SECRET,
  PROXY_REDIRECT_URL,
  JSON_OR_FORM,
} from "./constants";

export default async function token(req: FastifyRequest, res: FastifyReply) {
  console.log(req.body);
  const { code_verifier, client_id, code, ...extra } = req.body as any;

  const session = find(code, code_verifier);

  // if (!session) {
  //   res.status(400);
  //   return { error: "invalid_grant" };
  // }

  // consume(session);

  let options: RequestInit = {};

  if (JSON_OR_FORM === "json") {
    let body: string;
    try {
      body = JSON.stringify({
        client_id,
        code,
        ...extra,
        redirect_uri: PROXY_REDIRECT_URL,
      });
    } catch (e) {
      console.error(e);
      res.status(400);
      return { error: "invalid_body" };
    }

    options = {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${client_id}:${CLIENT_SECRET}`
        ).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body,
    };
  } else if (JSON_OR_FORM === "form") {
    const body = new URLSearchParams();
    body.append("client_id", client_id);
    body.append("client_secret", CLIENT_SECRET);
    body.append("code", code);
    Object.keys(extra).forEach((k) => {
      body.append(k, extra[k]);
    });
    body.set("redirect_uri", PROXY_REDIRECT_URL);

    options = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    };
  }

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    ...options,
  });

  res.status(response.status);

  return response.json();
}
