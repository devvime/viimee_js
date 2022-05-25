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
  async component(component, data = {}) {
    return await fetch(`/src/components?file=${component}`)
      .then(response => response.text())
      .then(text => {
        const array = text.split("\n")
        const html = []
        if (data !== {}) {
          const dataLoop = []
          dataLoop.push(data)
          array.map((line, i) => {
            dataLoop.map(paramItem => {
              const param = Object.entries(paramItem)
              param.map(p => {                
                line = line.replace("{{ "+ p[0] +" }}", p[1])
                line = line.replace("{{"+ p[0] +"}}", p[1])
              })                                      
            })
            html.push(line)
          })          
        }
        return this.template(html.join(''))
      })
  }
  template(html) {
    const template = document.createElement("template")
    template.innerHTML = html.trim()
    return template.content.firstElementChild
  }
  async loop(target, component, data = {}) {
    const dataLoop = []
    if (data !== {}) {
      dataLoop.push(data)
    }
    dataLoop.map(item => {
      item.map(async i => {
        await this.component(component, i).then(async res => {
          await document.querySelector(target).appendChild(res)
        })
      })      
    })
  }
  async include(target, component) {
    await document.querySelector(target).appendChild(component)
  }
}