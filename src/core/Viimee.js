import { encrypt, decrypt } from "./Utils"

export default class Viimee {
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
    const array = component.split("\n")
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
          const clickTarget = line.substring(line.indexOf('(click)=') - 1, line.lastIndexOf('"') + 1)
          if (clickTarget.indexOf('(click)') !== -1) {
            line = line.replace(clickTarget, ` _style_index='${encrypt(clickTarget)}'`)                
          }
        })
        html.push(line)
      })
    }
    return this.template(html.join(''))
  }
  template(html) {
    const template = document.createElement("template")
    template.innerHTML = html.trim()
    return template.content.firstElementChild
  }
  async loop(documentTarget, target, component, data = {}) {
    const dataLoop = []
    if (data !== {}) {
      dataLoop.push(data)
    }
    dataLoop.map(item => {
      item.map(async i => {
        const html = await this.component(component, i)
        documentTarget.querySelector(target).appendChild(html)
      })      
    })
  }
  async include(component, target, child) {
    await component.querySelector(target).appendChild(child)
  }
}