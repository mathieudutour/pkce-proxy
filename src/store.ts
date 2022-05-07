import crypto from "crypto";

type Store = {
  client_id: any;
  redirect_uri: any;
  state: any;
  pkce: { code_challenge: any; code_challenge_method: any };
  code?: any;
  expiration: number;
};

const store: Record<string, Store> = {};

export function add(
  client_id: any,
  redirect_uri: any,
  state: any,
  pkce: { code_challenge: any; code_challenge_method: any }
) {
  store[state] = {
    client_id,
    redirect_uri,
    pkce,
    state,
    expiration: Date.now() + 500 * 1000,
  };

  setTimeout(() => {
    delete store[state];
  }, 500 * 1000);
}

export function find(code: any, code_verifier: any) {
  if (typeof code_verifier !== "string" || !code) {
    return;
  }

  const candidate = Object.values(store).find((x) => x.code === code);

  console.log(candidate);
  console.log(base64_urlencode(code_verifier));

  if (
    candidate &&
    (candidate.pkce.code_challenge_method === "plain"
      ? candidate.pkce.code_challenge === base64_urlencode(code_verifier)
      : candidate.pkce.code_challenge ===
        crypto
          .createHash("sha256")
          .update(code_verifier)
          .digest("base64")
          .replace(/\+/g, "-")
          .replace(/\//g, "_")
          .replace(/=+$/, ""))
  ) {
    return candidate;
  }
}

export function findByState(state: any) {
  return store[state];
}

function base64_urlencode(str: string) {
  return Buffer.from(str)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
