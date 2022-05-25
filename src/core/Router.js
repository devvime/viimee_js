import { pathToRegex, getParams } from "./Utils"

export default class Router {
  constructor(routes) {    
    this.routes = routes
    this.navigateTo = url => {
      history.pushState(null, null, url)
      new Router(this.routes)
    }
    this.potentialMatches = this.routes.map(route => {
      return {
        route: route,
        result: location.pathname.match(pathToRegex(route.path))
      }
    })
    let match = this.potentialMatches.find(potentialMatches => potentialMatches.result !== null)
    if (!match) {
      match = {
        route: routes[0],
        result: [location.pathname]
      }
    }
    this.init(match)
    this.run()
  }
  async init(match) {
    const view = new match.route.view(getParams(match))
    document.querySelector("#app").innerHTML = await view.render()
  }
  run() {
    window.addEventListener("popstate", () => new Router(this.routes))
    document.addEventListener("DOMContentLoaded", () => {
      document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
          e.preventDefault()
          this.navigateTo(e.target.href)
        }
      })
      new Router(this.routes)
    })
  }
}