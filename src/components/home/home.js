import Component from "../../core/Component";

export default class Home extends Component {
  constructor(params) {
    super(params);
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
    const component = await this.component('home/home', data)    
    await this.loop(component,'#skills','home/skills/skills', data.skills)
    document.addEventListener('click', (e) => this.handleClick(e))
    return component
  }
  handleClick(e) {
    if (e.target.getAttribute('(click)') !== undefined) {
      const callback = e.target.getAttribute('(click)')
      eval(`this.${callback}`)
    }
  }
  clickTest(name) {
    console.log(name)
  }
}