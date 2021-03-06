let openTag = (name, attributes, selfClosing = false) => {
  let tag = `<span>&lt;${name}`

  if (attributes) {
    for (att in attributes) {
      try {
        tag = tag + ` ${att}="${attributes[att]}"`
      } catch {
        tag = tag + ` ${att}`
      }
    }
  } else {
    tag = `<span>&lt;${name}`
  }

  return selfClosing ? tag + " /&gt;</span>" : tag + "&gt;</span>"
}

let closeTag = (name) => {
  return `<span>&lt;/${name}&gt;</span>`
}
