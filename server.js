const express = require("express");
const routes = require("./routes")
const db = require("./config/connection")

const app = express();

app.use(routes);

db.once("open", () => {
     app.listen(3001, () => {
        console.log("Server is now listening!")
    })
})

