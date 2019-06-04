const docset = require('docset')

class DocsetHandleMultiplexer {
  constructor(docsets) {
    this.docsets = docsets
  }

  lookup(str) {
    return this.docsets.map(d => d.lookup(str))
  }

  merged(str) {
    const all = this.lookup(str).reduce((acc, e) => acc.concat(e), [])
    const sorted = all.sort((a, b) => a.name.length - b.name.length)
    return sorted
  }
}

function multiDocsetConvenienceFn(files) {
  const docsets = files.map(r => docset(r))
  return new DocsetHandleMultiplexer(docsets)
}

Object.assign(multiDocsetConvenienceFn, {
  DocsetHandleMultiplexer
})

module.exports = multiDocsetConvenienceFn
