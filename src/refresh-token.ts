import type { FastifyRequest, FastifyReply } from "fastify";
import { URLSearchParams } from "url";
import { REFRESH_TOKEN_URL, CLIENT_SECRET, JSON_OR_FORM } from "./constants";

export default async function refresh_token(
  req: FastifyRequest,
  res: FastifyReply
) {
  const { client_id, refresh_token, ...extra } = req.body as any;

  let options: RequestInit = {};

  if (JSON_OR_FORM === "json") {
    options = {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id,
        client_secret: CLIENT_SECRET,
        refresh_token,
        ...extra,
      }),
    };
  } else if (JSON_OR_FORM === "form") {
    const body = new URLSearchParams();
    body.append("client_id", client_id);
    body.append("client_secret", CLIENT_SECRET);
    body.append("refresh_token", refresh_token);
    Object.keys(extra).forEach((k) => {
      body.append(k, extra[k]);
    });

    options = {
      body,
    };
  }

  const response = await fetch(REFRESH_TOKEN_URL, {
    method: "POST",
    ...options,
  });

  res.status(response.status);
  res.header(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains"
  );

  return response.json();
}
