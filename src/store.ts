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
  const candidate = Object.values(store).find((x) => x.code === code);

  if (
    candidate &&
    (candidate.pkce.code_challenge_method === "plain"
      ? candidate.pkce.code_challenge === code_verifier
      : candidate.pkce.code_challenge === base64_urlencode(code_verifier))
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
