import type { FastifyRequest, FastifyReply } from "fastify";
import { add } from "./store";

const authorizeURL = "https://api.notion.com/v1/oauth/authorize";

export default async function authorize(
  req: FastifyRequest,
  res: FastifyReply
) {
  const {
    client_id,
    redirect_uri,
    code_challenge,
    code_challenge_method,
    state,
    ...extra
  } = req.query as Record<string, string>;

  add(client_id, redirect_uri, state, {
    code_challenge,
    code_challenge_method,
  });

  const params = new URLSearchParams();
  params.append("client_id", client_id);
  params.append("state", state);
  params.append(
    "redirect_uri",
    `https://raycast-notion-pkce-proxy.herokuapp.com/redirect`
  );
  Object.keys(extra).forEach((k) => {
    params.append(k, extra[k]);
  });

  return res.redirect(307, `${authorizeURL}?${params.toString()}`);
}
