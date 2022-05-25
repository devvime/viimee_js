import Component from "../../core/Component";

export default class Home extends Component {
  constructor(params) {
    super(params);
    this.setTitle("Home")    
  }
  async render() {
    const data = [{
      name: "Victor",
      age: 25,
      skills: [
        { name: "html", level: 100 },
        { name: "js", level: 95 },
        { name: "php", level: 98 }
      ]
    }]

    const component = await this.component('home/home', data)

    const loop = await this.loop('#skills','home/skills/skills', [data.shift().skills])

    return component
  }
}