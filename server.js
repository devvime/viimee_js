const express = require("express")
const path  = require("path")
const app = express()

app.use("/dist", express.static(path.resolve(__dirname,"dist")))

app.get("/src/components", (req, res) => {    
    res.sendFile(path.resolve(`src/components/${req.query.file}.component.html`))
})
app.get("/*", (req, res) => {
    res.sendFile(path.resolve("dist", "index.html"))
})

app.listen(process.env.PORT || 5050, () => console.log("Server running! 👍"))