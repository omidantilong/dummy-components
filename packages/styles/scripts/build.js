import * as sass from "sass"
import fs from "fs-extra"
import path from "path"

async function build() {
  const inputs = [{ path: "./scss/main.scss", file: "main.scss" }]
  const loadPaths = [path.resolve("./node_modules")]

  const files = await fs.readdir("./scss/components")

  console.log(files)
  await fs.emptyDir("./css")

  inputs.push(
    ...files.map((file) => {
      return { path: `./scss/components/${file}`, file: `components/${file}` }
    })
  )
  for (const input of inputs) {
    console.log(input)
    const output = sass.compile(input.path, {
      //style: "compressed",
      sourceMap: false,
      loadPaths,
    })

    await fs.outputFile(`./css/${input.file.replace("scss", "")}.css`, output.css)
  }
}

build().catch((error) => {
  console.log(error)
  process.exit(1)
})
