type Store = {
  client_id: any;
  redirect_uri: any;
  state: any;
  pkce: { code_challenge: any; code_challenge_method: any };
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

export function find(client_id: any, redirect_uri: any, code_verifier: any) {
  const candidates = Object.values(store).filter(
    (x) => x.client_id === client_id && x.redirect_uri === redirect_uri
  );

  const encoded = base64_urlencode(code_verifier);

  return candidates.find((x) =>
    x.pkce.code_challenge_method === "plain"
      ? x.pkce.code_challenge === code_verifier
      : x.pkce.code_challenge === encoded
  );
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
