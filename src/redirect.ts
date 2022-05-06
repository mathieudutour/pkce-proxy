import { Request, Response } from "express";
import { findByState } from "./store";

export default function redirect(req: Request, res: Response) {
  const { code, state, ...extra } = req.query;

  const stored = findByState(state);

  if (!stored) {
    return res.status(400).send("invalid_state");
  }

  const params = new URLSearchParams();
  params.append("code", code as string);
  params.append("state", state as string);
  Object.keys(extra).forEach((k) => {
    params.append(k, extra[k] as string);
  });

  return res.redirect(307, `${stored.redirect_uri}&${params.toString()}`);
}
