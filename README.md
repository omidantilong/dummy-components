# Dummy Component Sandbox

This is a very early proof of concept for how we could author multiple component flavours from the same repo. It draws heavily from patterns found in [IBM Carbon](https://github.com/carbon-design-system/carbon).

## Setup

The monorepo makes use of NPM workspaces and Lerna. NPM workspaces means you can run most package scripts without worrying too much about the project structure.

To get started, clone the repo, then:

```
nvm use
npm install
```

This will install all packages into a root node_modules folder and automatically symlink any shared dependencies.

To build all packages, you can simply run the build command at the root:

```
npm run build
```

Alternatively, Lerna can do this for you with the following command:

```
npx run lerna build
```

## Methodology

The `packages` directory contains top-level packages that are published to NPM. Rather than publishing individual components, we would publish a suite of components grouped by framework. So for instance, an engineer who wants to use the React components would run:

```
npm install @omidantilong/react
```

Individual components can then be imported using either of the following methods:

```
import { Alert } from "@omidantilong/react"
import Alert from "@omidantilong/react/Alert"
```

There is also a top-level `styles` package, which is a dependency of the framework-specific packages. Then, we can either:

1. Bundle styles into the component directly, with no need to import CSS separately — check the Astro `Dummy` component for an example of this in practice
2. Maintain complete separation and require engineers to import CSS into their pipeline(s) — this is how Carbon works, and it allows a greater degree of flexibility at the cost of slightly more overhead

## Versioning

Initially I assumed this would be handled with Lerna. I since discovered [Changesets](https://github.com/changesets/changesets) which seems like it might be a nice solution. It's used by the Astro core team (among many others). Using Changesets, the workflow would be:

- Do all the work, either on main or in a branch
- Run `npx changeset add`
- Changesets will detect which packages have changes and ask how they should be versioned
- A changeset file is created
- Then we can run `npx changeset version` locally or in a pipeline to update package versions for all affected packages, including dependencies
- Then `npx changeset publish` to publish the packages to NPM

Changesets has an official Github action and a well maintained but third-party [Gitlab CI component](https://github.com/un-ts/changesets-gitlab).

## Other Versioning Tools

- [NX Release](https://nx.dev/recipes/nx-release/automatically-version-with-conventional-commits) — untested, but looks it can handle conventional commits and do independent releases
- [Auto](https://intuit.github.io/) — untested, less community support, not sure about this but could be worth a look
