import * as sass from "sass-embedded"
import fs from "fs-extra"
import path from "node:path"
import { glob } from "glob"

async function build() {
  const loadPaths = [path.resolve("./node_modules")]

  await fs.emptyDir("./css")

  const paths = await glob("scss/**/*.scss", {
    ignore: {
      ignored: (p) => p.name.startsWith("_"),
    },
  })

  const inputs = paths.map((p) => {
    return { path: p, dir: path.dirname(p), file: path.basename(p) }
  })

  for (const input of inputs) {
    const output = sass.compile(input.path, {
      //style: "compressed",
      sourceMap: false,
      loadPaths,
    })

    const moduleDir = input.dir.replace("scss", "css")
    const moduleName = input.file.replace(".scss", "")

    await fs.outputFile(`${moduleDir}/${moduleName}.css`, output.css)
  }
}

build().catch((error) => {
  console.log(error)
  process.exit(1)
})
