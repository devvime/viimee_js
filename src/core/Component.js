export default class Component {
    constructor(params) {
        this.params = params        
    }
    setTitle(title) {
        document.title = title
    }
    async render() {
        return ""
    }
}