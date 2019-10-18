# vuecid-nuxt

[![Netlify Status](https://api.netlify.com/api/v1/badges/8bce6adc-e879-43fd-a818-82195c4cc572/deploy-status)](https://app.netlify.com/sites/vuecid-nuxt/deploys)

> Vuecid Nuxt Stack with Nuxt.js [vuecid-nuxt.lucid.build](https://vuecid-nuxt.lucid.build)

## Quickstart
Follow these steps to quickly set up your Vuecid-Nuxt-CraftCMS project:

1. Setup a local Craft CMS installation by using the [Vuecid-Craft Boilerplate](https://github.com/wearelucid/vuecid-craft/).
1. Install all npm packages `$ yarn`
1. Install further plugins/tools to your liking: `$ gulp setup`
1. Fetch the data needed to set up your navigation `$ yarn fetch`
1. Go to `/config.js` and add the necessary settings.
  - Your languages (also make sure not to forget the siteHandle for a craft multisite setup)
  - Your local Craft installation URL
  - Your GraphQL endpoint
  - Your home slug
1. Run `$ yarn dev` to start the nuxt server


## Build Setup

``` bash
# Install dependencies
$ yarn

# Install further plugins/tools
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

## Setup
### Seomatic
This opinionated boilerplate uses the seomatic plugin for SEO. Therefore we have an apollo query within the `_basePage.vue`.

### Apollo queries
Check the sections that are queried within `_basePage.vue` and `page.gql`.

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
**[Nuxt child](https://nuxtjs.org/api/components-nuxt-child/) once and forever explained:**
```
-| pages/
---| _slug/ // directory to nest nuxt child
------| childslug.vue // Template file for child
------| index.vue // Fallback template file for missing childslug
---| _slug.vue // file with <NuxtChild /> inside
```

- Every file named with a `_` underscore is a dynamic route and is replaced by whatever stands in the url
- Every folder with named with a `_` underscore is a dynamic route
- If the `_slug.vue` mentions a `<NuxtChild />` it will display the .vue template within the folder which has the same name as the parent – in this case `_slug`.
- within the router the params `slug` and `childslug` will be populated. domain.ch/level1/childlevel will result in `slug` = _level1_ and `childslug` = _childlevel_.
- Whenever the `childslug` param is missing the `pages/_slug/index.vue` template is taken. In this case we leave it empty and do nothing.

### Transitions on nuxt-child
If you want a custom transition on nuxt child pages, you need to make sure that the nuxt-child component rerenders after a route change. You can do this by adding a `key` like `<NuxtChild :key="$route.params.slugchild" />`.
Additionally you have to set a transition within the child template.
```
transition: {
  name: 'slugchild',
  mode: 'out-in'
},
```
And also define the transition, for example in the layout.scss:
```
// transitions child pages by making them red during the transition.
.slugchild-enter-active,
.slugchild-leave-active {
  position: relative;
  transition: background-color 1s;
}

.slugchild-enter,
.slugchild-leave-active {
  background-color: red;
}
```

For understandable transitions with leave, leave-to and leave-active etc.
check the `layout.scss` file with the defined slugchild animations and also check this image:

<img src="https://vuejs.org/images/transition.png?_sw-precache=5990c1dff7dc7a8fb3b34b4462bd0105" width="500">

## Tools
### Grid System: Susy
If you decide to install susy on top via `$ gulp setup` you get a nice grid system [Susy](http://oddbird.net/susy/docs/).
It can be seen in action on `components/Examples/DemoGrid/Demogrid.vue`.

Most important are the two sass functions:

`span(x of $s-amount-columns)`
(This sets the width: X columns of total $s-amount-columns)

and
`gutter(of $s-amount-columns)`
(This sets the gutter: X gutters of total $s-amount-columns)

The susy grid settings are saved in `tools.grid.scss` (this file is automatically generated during `$ gulp setup`).

To check if your layout is aligning with the grid, one can use: 
`background: susy-svg-grid($colors: rgba(#c7eaee, 0.26)) no-repeat scroll;` 
on any container to show the grid helper svg.

#### Susy Installation
Use the setup client
`$ yarn setup` and choose to install susy with the project.
What it does:
1. Installs susy.
1. Sets up a grid settings file.
