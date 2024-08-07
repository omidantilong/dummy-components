# Dummy Component Sandbox

This is a very early proof of concept for how we could author multiple component flavours from the same repo. It draws heavily from patterns found in [IBM Carbon](https://github.com/carbon-design-system/carbon). 

#### Methodology

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

#### Todo

- Improve monorepo setup with lerna etc
