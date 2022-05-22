import Component from "../core/Component";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.setTitle("Home")        
    }
    async render() {
        return `<h1>Home page</h1>`
    }
    
}