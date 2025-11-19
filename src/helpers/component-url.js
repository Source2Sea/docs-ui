'use strict'

module.exports = (components, name) => {
  if (!components || !name) return undefined
  const comp = (components || []).find((c) => c && (c.name === name || c.title === name))
  if (!comp) return undefined
  const latest = comp.latestVersion || (comp.versions && comp.versions[0])
  return (latest && latest.url) || comp.url
}
