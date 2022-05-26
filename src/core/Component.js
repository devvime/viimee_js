import { encrypt, decrypt } from "./Utils"

export default class Component {
  constructor(params) {
    this.params = params
    document.addEventListener('click', (e) => this.handleClick(e))
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
              const clickTarget = line.substring(line.indexOf('(click)=') -1, line.lastIndexOf('"'))
              if (clickTarget.indexOf('(click)') !== -1) {
                console.log(clickTarget);
                line = line.replace(clickTarget, ` __style_index='${encrypt(clickTarget)}'`)
              }
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
  async loop(documentTarget, target, component, data = {}) {
    const dataLoop = []
    if (data !== {}) {
      dataLoop.push(data)
    }
    dataLoop.map(item => {
      item.map(async i => {
        await this.component(component, i).then(res => {
          documentTarget.querySelector(target).appendChild(res)
        })
      })      
    })
  }
  async include(target, component) {
    await document.querySelector(target).appendChild(component)
  }
  handleClick(e) {
    if (e.target.getAttribute('__style_index') !== null) {
      const callback = decrypt(e.target.getAttribute('__style_index')).split('"')[1]
      eval(`this.${callback}`)
    }
  }
}