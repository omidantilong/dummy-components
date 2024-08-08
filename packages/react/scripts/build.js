import { rollup } from "rollup"
import { nodeResolve as rollupNodeResolve } from "@rollup/plugin-node-resolve"
import { default as rollupTypescript } from "@rollup/plugin-typescript"
//import path, { resolve } from "node:path"
//import packageJson from "../package.json" with { type: "json" }
import fs from "fs-extra"
const rootDir = "src"

async function build() {
  const formats = [
    {
      type: "esm",
      outDir: "lib",
    },
    // {
    //   type: "commonjs",
    //   outDir: "cjs",
    // },
  ]
  for (const format of formats) {
    const { outDir, type } = format

    await fs.emptyDir(`./${outDir}`)

    const plugins = [
      rollupNodeResolve(),
      rollupTypescript({
        outDir,
        rootDir,
      }),
    ]
    const external = ["react", "react-dom", "react/jsx-runtime"]
    const bundle = await rollup({ input: "src/index.ts", plugins, external })

    await bundle.write({
      dir: outDir,
      exports: "named",
      format: type,
      preserveModules: true,
      preserveModulesRoot: rootDir,
    })
  }
}

build().catch((error) => {
  console.log(error)
  process.exit(1)
})

// import fs from "fs-extra"
// ;(async () => {
//   const components = await fs.readdir("./src/components")

//   if (components.length) {
//     await fs.emptyDir("./lib")
//   }

//   for await (const component of components) {
//     await fs.copy(`./src/components/${component}`, `./lib/components/${component}`)
//   }

//   await fs.copy("./src/index.ts", "./lib/index.ts")
// })()
