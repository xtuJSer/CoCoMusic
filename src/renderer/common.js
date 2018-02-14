export let common = {
  objectCopy (source, target) {
    let newSource = JSON.parse(JSON.stringify(source))
    Object.keys(newSource).forEach(e => (target[e] = newSource[e]))
  }
}
