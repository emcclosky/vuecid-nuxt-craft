# Lerna
This repo is setup as a Mono-Repo, containing the boilerplate and further packages within `/packages/`.

More about lerna (and docs):
- https://github.com/lerna/lerna
- https://lerna.js.org/

Probably also good to know:
[How to publish an npm package](https://wearelucid.atlassian.net/wiki/spaces/LW/pages/825524229?search_id=c09b26d4-6d21-40e1-bb95-f1cb47f6c219) (Page not publicly available...)

## Quick guide: How to publish npm packages with lerna
1. Make changes to your code.
1. Probably convert ES6 Code to older code with babel: `$ cd packages/yourpackage && yarn build`
1. ⚠️ No need to bump version in `packages/yourpackage/package.json`, lerna will do that for you.
1. Commit and push changes and newly generated `.js` files.
1. `$ lerna publish` – This will cause lerna to check for changes, tell you which package will be released.
1. Lerna prompts you if you want to make a Major, Minor or Patch release (-> [Semantic versioning](https://semver.org/))
1. Lerna will increase the version accordingly and create tags and push them to the remote also initiates a new release of the npm pacakge.
1. Done. 🤙🏼

