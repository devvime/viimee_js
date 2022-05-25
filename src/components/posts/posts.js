import Component from "../../core/Component";

export default class Posts extends Component {
  constructor(params) {
    super(params);
    this.setTitle("Posts")
    console.log(this.params);
  }
  async render() {
    return await this.component('posts/post', {
        id: this.params.id,
      })
  }
}