import type { FastifyRequest, FastifyReply } from "fastify";
import { findByState } from "./sessions";

export default async function redirect(req: FastifyRequest, res: FastifyReply) {
  const { code, state, ...extra } = req.query as Record<string, string>;

  const session = findByState(state);

  if (!session) {
    return res.status(400).send("invalid_state");
  }

  session.code = code;

  const params = new URLSearchParams();
  params.append("code", code as string);
  params.append("state", state as string);
  Object.keys(extra).forEach((k) => {
    params.append(k, extra[k] as string);
  });

  return res.redirect(307, `${session.redirect_uri}&${params.toString()}`);
}
