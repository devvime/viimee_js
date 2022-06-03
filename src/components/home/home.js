import Viimee from "../../core/Viimee"
import "./home.component.scss"
import html from "./home.component.html"
import skills from './skills/index.html'
import htmlChild from './child/index.html'

export default class Home extends Viimee {
  constructor(params) {
    super(params);
    this.clickEvent = super(this.clickEvent)
    this.clickEvent = Home
    this.setTitle("Home")
  }
  async render() {
    const data = {
      name: "Victor",
      age: 25,
      skills: [
        { id: 1, name: "html", level: 100 },
        { id: 2, name: "js", level: 95 },
        { id: 3, name: "php", level: 98 }
      ]
    }
    const component = await this.component(html, data)
    await this.loop(component,'#skills', skills, data.skills)
    const child = await this.component(htmlChild, data)
    await this.include(component, '#include', child)
    return component
  }  
  clickTest(name) {
    alert(name)
  }
}