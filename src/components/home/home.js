import Component from "../../core/Component";

export default class Home extends Component {
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
    const component = await this.component('home/home', data)    
    await this.loop(component,'#skills','home/skills/skills', data.skills) 
    return component
  }  
  clickTest(name) {
    console.log(name)
  }
}