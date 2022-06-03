import Viimee from "../../core/Viimee";
import post from './post.html'

export default class Posts extends Viimee {
  constructor(params) {
    super(params);
    this.setTitle("Posts")
    console.log(this.params);
  }
  async render() {
    return await this.component(post, {
        id: this.params.id,
    })
  }
}