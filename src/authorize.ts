import type { FastifyRequest, FastifyReply } from "fastify";
import { add } from "./sessions";
import { AUTHORIZE_URL, PROXY_REDIRECT_URL } from "./constants";

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
  params.append("redirect_uri", PROXY_REDIRECT_URL);
  Object.keys(extra).forEach((k) => {
    params.append(k, extra[k]);
  });

  return res.redirect(307, `${AUTHORIZE_URL}?${params.toString()}`);
}
