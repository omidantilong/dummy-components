import { rollup } from "rollup"
import { nodeResolve as rollupNodeResolve } from "@rollup/plugin-node-resolve"
import { default as rollupTypescript } from "@rollup/plugin-typescript"
import path, { resolve } from "node:path"
import packageJson from "../package.json" with { type: "json" }

const __dirname = resolve()
const outDir = "lib"
const rootDir = "src"

async function build() {
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
    format: "esm",
    preserveModules: true,
    preserveModulesRoot: rootDir,
  })
}

build().catch((error) => {
  console.log(error)
  process.exit(1)
})
