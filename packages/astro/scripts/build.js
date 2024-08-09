import fs from "fs-extra"
;(async () => {
  const components = await fs.readdir("./src/components")

  if (components.length) {
    await fs.emptyDir("./lib")
    await fs.ensureDir("./lib/components")
  }

  let componentIndex = []

  for await (const component of components) {
    const typeDeclaration = `export default function ${component}(_props: import("./${component}.astro").Props): any`
    const componentExport = `export { default as ${component} } from "./components/${component}/${component}.astro"`

    await fs.mkdir(`./lib/components/${component}`)
    await fs.copy(
      `./src/components/${component}/${component}.astro`,
      `./lib/components/${component}/${component}.astro`
    )
    await fs.writeFile(`./lib/components/${component}/${component}.d.ts`, typeDeclaration)

    componentIndex.push(componentExport)
  }

  //const moduleDeclaration = `declare module "*"`

  const tsConfig = {
    extends: "astro/tsconfigs/strict",
    compilerOptions: {
      jsx: "preserve",
    },
  }

  //await fs.writeFile(`./lib/index.d.ts`, moduleDeclaration)
  await fs.copy("./env.d.ts", "./lib/env.d.ts")
  await fs.writeFile(`./lib/tsconfig.json`, JSON.stringify(tsConfig))
  await fs.writeFile(`./lib/index.ts`, componentIndex.join("\n"))
})()
