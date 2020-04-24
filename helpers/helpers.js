let openTag = (name, attributes, selfClosing=false) => {
  let tag = `&lt;${name}`

  if(attributes){
    for(att in attributes){
      tag = tag + ` ${att}="${attributes[att]}"`
    }
  }
  else{
    tag = `&lt;${name}` 
  }

  return selfClosing ? tag + ' /&gt;' : tag + '&gt;'
}

let closeTag = (name) => {
  return `&lt;/${name}&gt;`
}
