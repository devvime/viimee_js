export const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$")

export const getParams = match => {
  if (match.result === undefined) {
    return
  }
  const values = match.result.slice(1)
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1])
  return Object.fromEntries(keys.map((key, i) => {
    return [key, values[i]]
  }))
}