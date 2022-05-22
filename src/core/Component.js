export default class Component {
  constructor(params) {
    this.params = params
  }
  setTitle(title) {
    document.title = title
  }
  async render() {
    return ""
  }
  async component(component) {
    return await fetch(`./src/components/${component}`)
      .then(response => response.text())
      .then(text => {
        const array = text.split("\n")
        return array.join('')
      })
  }
}