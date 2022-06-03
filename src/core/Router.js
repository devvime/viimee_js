import { pathToRegex, getParams } from './Utils'
import Viimee from "./Viimee"
import html404 from '../components/404/index.html' 

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
      this.notFound()
      return
    }
    this.init(match)
    this.run()
  }
  async notFound() {
    const view = new Viimee()
    const html = await view.component(html404)
    document.body.appendChild(html)
    return
  }
  async init(match) {
    const view = new match.route.view(getParams(match))
    document.querySelector(match.route.target || '#app').innerHTML = ''
    document.querySelector(match.route.target || '#app').appendChild(await view.render())
  }
  run() {    
    document.addEventListener("DOMContentLoaded", () => {
      window.addEventListener("popstate", () => new Router(this.routes))
      document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
          e.preventDefault()
          this.navigateTo(e.target.href)
        }
      })
    })
  }
}