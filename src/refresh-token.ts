import type { FastifyRequest, FastifyReply } from "fastify";
import { URLSearchParams } from "url";
import {
  REFRESH_TOKEN_URL,
  CLIENT_SECRET,
  JSON_OR_FORM,
  PROXY_REDIRECT_URL,
} from "./constants";

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
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id,
        client_secret: CLIENT_SECRET,
        refresh_token,
        ...extra,
        redirect_uri: PROXY_REDIRECT_URL,
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
    body.append("redirect_uri", PROXY_REDIRECT_URL);

    options = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body,
    };
  }

  const response = await fetch(REFRESH_TOKEN_URL, {
    method: "POST",
    ...options,
  });

  res.status(response.status);

  return response.json();
}
