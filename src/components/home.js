import Component from "../core/Component";

export default class Home extends Component {
  constructor(params) {
    super(params);
    this.setTitle("Home")
  }
  async render() {
    return this.component('home')
  }
}