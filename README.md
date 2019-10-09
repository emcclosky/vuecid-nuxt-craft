# vuecid-nuxt

[![Netlify Status](https://api.netlify.com/api/v1/badges/8bce6adc-e879-43fd-a818-82195c4cc572/deploy-status)](https://app.netlify.com/sites/vuecid-nuxt/deploys)

> Vuecid Nuxt Stack with Nuxt.js [vuecid-nuxt.lucid.build](https://vuecid-nuxt.lucid.build)

## Build Setup

``` bash
# Install dependencies
$ yarn

# Serve with hot reload at localhost:3000
$ yarn dev

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

## Fetch Content
The plugin [API Fetcher](https://github.com/wearelucid/api-fetcher) can fetch the data from WordPress
``` bash
# Fetch data
$ yarn fetch
```

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

## Tools
### Grid System: Susy
We make use of a nice sass based grid system: [Susy](http://oddbird.net/susy/docs/)
Most important are the two sass functions:

`span(x of $s-amount-columns)`
(This sets the width: X columns of total $s-amount-columns)

and
`gutter(of $s-amount-columns)`
(This sets the gutter: X gutters of total $s-amount-columns)


The susy grid settings are saved in `tools.grid.scss`.
To check if your layout is aligning with the grid, one can use: 
`background: susy-svg-grid($colors: rgba(#c7eaee, 0.26)) no-repeat scroll;` 
on any container to show the grid helper svg.
