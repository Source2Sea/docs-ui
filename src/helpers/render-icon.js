'use strict'

module.exports = function renderIcon (icon) {
  const val = typeof icon === 'string' ? icon.trim() : ''
  if (!val) return ''

  const isUrl = /^(https?:)?\/\//i.test(val) || val.startsWith('/')
  const isImagePath = /\.(svg|png|jpe?g|gif|webp)$/i.test(val)
  const isNonPath = !isUrl && !isImagePath

  if (isNonPath) {
    const raw = val
    const name = raw.startsWith('mdi:') ? raw.slice(4) : raw
    const safe = name.replace(/[^a-z0-9-]/gi, '')
    return '<span class="mdi mdi-' + safe + '" aria-hidden="true"></span>'
  } else {
    const src = val.replace(/"/g, '&quot;')
    return '<img src="' + src + '" alt="" loading="lazy" />'
  }
}
