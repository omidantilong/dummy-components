import * as sass from "sass"
import fs from "fs-extra"
import path from "path"

async function build() {
  const input = "./scss/main.scss"
  const loadPaths = [path.resolve("./node_modules")]

  await fs.emptyDir("./css")

  const output = sass.compile(input, {
    //style: "compressed",
    sourceMap: false,
    loadPaths,
  })

  // const output = await postcss([
  //     autoprefixer({ grid: true }),
  //     sortMediaQueries(), // eslint-disable-line @typescript-eslint/no-unsafe-call
  // ]).process(compiledSass.css, {
  //     from: input,
  // })

  //const sourceMapReference = `/*# sourceMappingURL=${outputFileName}.css.map */`
  await fs.outputFile(`./css/main.css`, output.css)
}

build().catch((error) => {
  console.log(error)
  process.exit(1)
})
