'use strict'

module.exports = (components, name) => {
  if (!components || !name) return name
  const comp = (components || []).find((c) => c && (c.name === name || c.title === name))
  return (comp && (comp.title || comp.name)) || name
}
