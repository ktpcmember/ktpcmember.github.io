const fs = require("node:fs")
const str = fs.readFileSync("./le/le.html", "utf8")
fs.writeFileSync("res.html", str.replace(/></g, ">\n<"))
