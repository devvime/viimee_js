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
    let tplHtml
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

      tplHtml = html.join('')
      const ifTarget = tplHtml.substring(tplHtml.indexOf('[if') + 1, tplHtml.lastIndexOf('[/if]'))
      if (ifTarget) {
        let argument = ifTarget.split(']')
        let dataArgument = argument[0].substring(argument[0].indexOf('(') + 1, argument[0].lastIndexOf(')'))
        dataArgument = `data.${dataArgument}`
        eval(`
        if (${dataArgument}) {
          tplHtml = tplHtml.replace('['+argument[0]+']', "").replace('[/if]', "")
        } else {
          tplHtml = tplHtml.replace(argument[1], '').replace(argument[0], '').replace('[][/if]', '')
        }
      `)
      }
    }
    return this.template(tplHtml)
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