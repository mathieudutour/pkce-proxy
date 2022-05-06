import { Request, Response } from "express";
import { add } from "./store";
import qs from "querystring";

const authorizeURL = "https://api.notion.com/v1/oauth/authorize";

export default function authorize(req: Request, res: Response) {
  const {
    client_id,
    redirect_uri,
    code_challenge,
    code_challenge_method,
    ...extra
  } = req.query;

  add(client_id, redirect_uri, { code_challenge, code_challenge_method });

  const params = new URLSearchParams();
  params.append("client_id", client_id as string);
  params.append("redirect_uri", redirect_uri as string);
  Object.keys(extra).forEach((k) => {
    params.append(k, extra[k] as string);
  });

  return res.redirect(307, `${authorizeURL}?${params.toString()}`);
}
