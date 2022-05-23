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
  async component(component, data = []) {
    return await fetch(`/src/components?file=${component}`)
      .then(response => response.text())
      .then(text => {
        const array = text.split("\n")
        const html = []
        if (data !== {}) {
          array.map(line => {
            data.map(paramItem => {
              const param = Object.entries(paramItem)
              param.map(p => {                
                line = line.replace("{{ "+ p[0] +" }}", p[1])
                line = line.replace("{{"+ p[0] +"}}", p[1])
              })                                      
            })
            html.push(line)
          })          
        }        
        return html.join('')
      })
  }
}