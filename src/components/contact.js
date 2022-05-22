import Component from "../core/Component";

export default class Contact extends Component {
    constructor(props) {
        super(props);
        this.setTitle("Contact")        
    }
    async render() {
        return `<h1>Contact page</h1>`
    }
    
}