const docset = require('docset')

class DocsetHandleMultiplexer {
  constructor (docsets) {
    this.docsets = docsets
  }

  lookup (str, opts) {
    return this.docsets.map(d => d.lookup(str, opts))
  }

  merged (str, opts) {
    const all = this.lookup(str, opts).reduce((acc, e) => acc.concat(e), [])
    const sorted = all.sort((a, b) => a.name.length - b.name.length)
    return sorted
  }

  info () {
    return this.docsets.map(d => d.info())
  }

  sanityCheck () {
    return this.docsets.map(d => d.sanityCheck())
  }
}

function multiDocsetConvenienceFn (files) {
  const docsets = files.map(r => docset(r))
  return new DocsetHandleMultiplexer(docsets)
}

Object.assign(multiDocsetConvenienceFn, {
  DocsetHandleMultiplexer
})

module.exports = multiDocsetConvenienceFn
