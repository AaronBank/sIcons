export default function mountFilter (r, callback) {
  console.log(r.keys())
  r.keys().forEach((modulePath) => {
    const fn = r(modulePath)

    const moduleName = modulePath.match(/^\.\/(.+).js$/)[1]

    callback(moduleName, fn.default)
  })
}
