# vuecid-nuxt

[![Netlify Status](https://api.netlify.com/api/v1/badges/8bce6adc-e879-43fd-a818-82195c4cc572/deploy-status)](https://app.netlify.com/sites/vuecid-nuxt/deploys)

> Vuecid Nuxt Stack with Nuxt.js [vuecid-nuxt.lucid.build](https://vuecid-nuxt.lucid.build)

## Quickstart
Follow these steps to quickly set up your Vuecid-Nuxt-CraftCMS project:

1. Setup a local Craft CMS installation by using the [Vuecid-Craft Boilerplate](https://github.com/wearelucid/vuecid-craft/).
1. Install all npm packages `$ yarn`
1. Install further plugins/tools to your liking: `$ gulp setup` (See [Tools](#Tools))
1. Go to `/config.js` and add the necessary settings.
  - Your local Craft installation URL
  - Your languages (also make sure not to forget the siteHandle/siteId for a craft multisite setup)
  - Your GraphQL endpoint
  - Your home slug
1. Fetch the data needed to set up your navigation `$ yarn fetch`
1. Run `$ yarn dev` to start the nuxt server
1. Find `TODO` comments and setup your project. This might include:
  - Delete example styling (`/assets/css/_export.breakpoints.scss`)
  - Delete corresponding (`class="examples--div"` and other stylings from the `_examples.scss`)
  – Delete Nuxt-Child examples (Delete folder `/pages/examples`).
  - Setup typography (heading stylings etc.)



## Build Setup

``` bash
# Install dependencies
$ yarn

# Install further plugins/tools
# like modernizr, susy, ie11 polyfills
$ gulp setup

# Serve with hot reload at localhost:3000
$ yarn dev

# Scaffold components or vuex modules
$ yarn scaffold

# Build for production and launch server
$ yarn build
$ yarn start

# Generate static project
$ yarn generate

# Pretend we are Netlify (exept ./static/_redirects)
# Requires globally installed serve
$ yarn global add serve
$ yarn netlifyify

# Analyze bundle
$ yarn build --analyze
```

Search for TODO's inside the project to get everything setup nicely for your new website.
For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

## Information
### Seomatic
This opinionated boilerplate uses the seomatic plugin for SEO. Therefore we have an apollo query within the `_basePage.vue`.

### Apollo queries
Check the sections that are queried within `_basePage.vue` and `page.gql`.
Why the schemaQuery, you ask? [Medium: Heuristic Fragment matcher warning! How to fix it?](https://medium.com/commutatus/whats-going-on-with-the-heuristic-fragment-matcher-in-graphql-apollo-client-e721075e92be)

### Google Analytics/Google Tag Manager
The `components/Examples/CookieBar/CookieBar.vue` includes two methods to enable either Google Analytics or Google Tag Manager after the user accepts the cookies.
Further reading on how to setup GTM: [Wiki: How to use Nuxt with Google Tag Manager](https://wearelucid.atlassian.net/wiki/spaces/LW/pages/902496260/How+to+use+Nuxt+with+Google+Tag+Manager) (This document might not be public (yet)).

## Scaffolding
Components and store modules can be scaffolded
``` bash
# scaffold component or store module
$ yarn scaffold
```

## Logging
This project makes use of a customized [bows](https://github.com/wearelucid/vue-bows) logger. To use it via this.log('Hello Lucid') you must enable it in your browsers console: Type `localStorage.debug = true` in your browser's console to activate it. The big advantage of this is, that even on production level you can still access logs.

## Sass/SCSS Guidelines and Mixins
See [docs/SCSS_Styleguide.md](docs/SCSS_Styleguide.md)

## NuxtChild
See [docs/Nuxt_Child.md](docs/Nuxt_Child.md)

## Tools
- Susy Grid System: [docs/Susy_Grid.md](docs/Susy_Grid.md)

## Lerna & Managing a Mono-Repo
- Susy Lerna: [docs/Lerna.md](docs/Lerna.md)
