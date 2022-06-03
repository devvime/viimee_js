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
          array.map((line, i) => {
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
        
        //loop
        if (html.join('').indexOf("#loop") !== -1) {
          data = data.shift()
          const loopTpl = html.join('').split("#loop")[1].split("#endloop")[0]                
          const newTpl = ""

          const rule = loopTpl.split('={')[1].split('}')[0]
          const letRule = rule.split(' ')[0]        
          .replace(' ','').replace('{{','').replace('}}','').replace('<p>','').replace('</p>','').replace('\r','').replace('}}</p>\r','').split('.')

          const params = []
          loopTpl.split("\r").map(x => {
            const line = x
            const getParam = x.substring(x.indexOf("}}"), x.lastIndexOf('{{') +3).replace(' ','').replace('={','')          
            if (getParam !== undefined && getParam !== ' ' && getParam !== '') {
              params.push(getParam)
            }
          })

          console.log(params);

          const runLoop = `
            for (let ${letRule} of ${rule.split(" ")[2]}) {
              newTpl += loopTpl.replace("={${rule}}","")            
            }
          `
          eval(runLoop)                
          //endloop

          return html.join('').replace(loopTpl, newTpl).replace("#loop", "").replace("#endloop", "")
        } else {
          return html.join('')
        }       
      })
  }
}