export const PROXY_HOSTNAME = process.env.PROXY_HOSTNAME as string;
if (!process.env.PROXY_HOSTNAME) {
  throw new Error("PROXY_HOSTNAME env variable is not set");
}

export const PROXY_REDIRECT_URL = `${process.env.PROXY_REDIRECT_URL}/redirect`;

export const TOKEN_URL = process.env.TOKEN_URL as string;
if (!process.env.TOKEN_URL) {
  throw new Error("TOKEN_URL env variable is not set");
}

export const CLIENT_SECRET = process.env.CLIENT_SECRET as string;
if (!process.env.CLIENT_SECRET) {
  throw new Error("CLIENT_SECRET env variable is not set");
}

export const AUTHORIZE_URL = process.env.AUTHORIZE_URL as string;
if (!process.env.AUTHORIZE_URL) {
  throw new Error("AUTHORIZE_URL env variable is not set");
}
