# PKCE Proxy for Raycast

A barebones proxy to enable the PKCE flow for OAuth providers that do not support PKCE.

The proxy server has been tested with Notion but it may need some tweaks to adapt it to another provider.

## Configuration

The proxy uses environment variables to be as versatile as possible. You will need to provide a few for it to work.

Here is an example using [Notion](https://notion.so) as the provider:

```
PROXY_HOSTNAME=https://your-proxy-domain
CLIENT_SECRET=client-secret-provided-by-notion
AUTHORIZE_URL=https://api.notion.com/v1/oauth/authorize
TOKEN_URL=https://api.notion.com/v1/oauth/token
```

If the provider supports refreshing tokens and the endpoint to refresh tokens is different from `TOKEN_URL`, you can specify `REFRESH_TOKEN_URL`.

## Running Locally

```sh
npm install
npm run build
npm start
```

The proxy should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

or

Make sure you have the [Heroku CLI](https://cli.heroku.com/) installed.

```
heroku create
git push heroku main
heroku open
```

## Documentation

For more information about OAuth with Raycast, see:

- [Raycast developer documentation](https://developers.raycast.com/api-reference/oauth)
- [Raycast extension using this proxy](https://github.com/raycast/extensions/tree/main/extensions/notion)
