# PKCE Proxy for Raycast

A barebones PKCE proxy to enable OAuth for OAuth providers that do not support PKCE.

The proxy server has been tested with Notion but it may need some tweaks to adapt it to another provider.

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
