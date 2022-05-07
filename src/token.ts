import { Request, Response } from "express";
import { find } from "./store";

const secret = "secret_8THB2z6RB1CvTc0sqIDditbyNWUqWlQs0f41Drikklx";
const tokenURL = "https://api.notion.com/v1/oauth/token";

export default function token(req: Request, res: Response) {
  const { code_verifier, client_id, code, ...extra } = req.body;
  console.log(req.body);

  if (!find(code, code_verifier)) {
    return res.status(400).send("invalid_grant");
  }

  res.header(
    "Authorization",
    `Basic ${Buffer.from(`${client_id}:${secret}`).toString("base64")}`
  );

  // const params = new URLSearchParams();
  // params.append("client_id", client_id as string);
  // params.append("redirect_uri", redirect_uri as string);
  // Object.keys(extra).forEach((k) => {
  //   params.append(k, extra[k] as string);
  // });

  return res.redirect(307, `${tokenURL}`);
}
