/* eslint-env browser */
'use strict'

;(function () {
  function injectContent (container, url, innerSelector, stripTitle) {
    if (!url) return
    fetch(url, { credentials: 'same-origin' })
      .then(function (res) {
        if (!res.ok) throw new Error('Failed to fetch hero content: ' + res.status)
        return res.text()
      })
      .then(function (html) {
        var tmp = document.implementation.createHTMLDocument('')
        tmp.documentElement.innerHTML = html
        var doc = tmp.querySelector('.doc') || tmp.body
        if (!doc) return
        // clone and optionally strip top page title if present
        var fragment = document.createDocumentFragment()
        Array.prototype.slice.call(doc.children).forEach(function (el) {
          if (stripTitle && el.classList && el.classList.contains('page')) return
          fragment.appendChild(el.cloneNode(true))
        })
        var target = innerSelector ? container.querySelector(innerSelector) : container
        target.innerHTML = ''
        target.appendChild(fragment)
      })
      .catch(function (err) {
        if (window && window.console && console.warn) console.warn('[landing-include] ' + err.message)
      })
  }

  function onReady () {
    var hero = document.querySelector('.landing-hero[data-landing-hero-src]')
    if (hero) {
      var src = hero.getAttribute('data-landing-hero-src')
      if (src) injectContent(hero, src, '.landing-hero-inner', true)
    }

    var catHeads = document.querySelectorAll('.category-head[data-category-head-src]')
    if (catHeads && catHeads.length) {
      for (var i = 0; i < catHeads.length; i++) {
        var node = catHeads[i]
        var src2 = node.getAttribute('data-category-head-src')
        if (src2) injectContent(node, src2, '.category-head-inner', false)
      }
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', onReady)
  else onReady()
})()
