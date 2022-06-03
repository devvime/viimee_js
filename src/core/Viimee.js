import { encrypt, decrypt } from "./Utils"

export default class Viimee {
  constructor(params) {
    this.params = params
    this.clickEvent
    this.addClickEvent()
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
  addClickEvent() {
    document.addEventListener('click', (e) => this.handleClick(e, this.clickEvent))
    if (this.clickEvent === undefined) {
      document.removeEventListener('click', (e) => this.handleClick(e, undefined))
    }
  }
  handleClick(e, component) {
    if (component === undefined) {
      return
    }
    if (e.target.getAttribute('_style_index') !== null) {
      const callback = decrypt(e.target.getAttribute('_style_index')).split('"')[1]
      if (component.prototype !== undefined) {
        eval(`component.prototype.${(callback)}`)
      }                
    }
  }
}