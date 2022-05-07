import type { FastifyRequest, FastifyReply } from "fastify";
import { findByState } from "./store";

export default async function redirect(req: FastifyRequest, res: FastifyReply) {
  const { code, state, ...extra } = req.query as Record<string, string>;

  const stored = findByState(state);

  if (!stored) {
    return res.status(400).send("invalid_state");
  }

  stored.code = code;

  const params = new URLSearchParams();
  params.append("code", code as string);
  params.append("state", state as string);
  Object.keys(extra).forEach((k) => {
    params.append(k, extra[k] as string);
  });

  return res.redirect(307, `${stored.redirect_uri}&${params.toString()}`);
}
