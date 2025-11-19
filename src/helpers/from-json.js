'use strict'

module.exports = (value) => {
  if (!value) return undefined
  if (typeof value === 'object') return value
  try {
    const parsed = JSON.parse(String(value))
    return parsed
  } catch (e) {
    const src = String(value)
    const preview = src.length > 200 ? src.slice(0, 200) + '…' : src
    // Surface a clear error in the build/preview logs to aid debugging
    // Note: we intentionally do not throw to avoid breaking the whole render
    // of pages that depend on this helper; templates should treat undefined
    // as "not provided" and continue gracefully.
    // eslint-disable-next-line no-console
    console.error('[from-json] Invalid JSON. Error:', e.message, '\n[from-json] Input preview:', preview)
    return undefined
  }
}
