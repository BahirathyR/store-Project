require("express-async-errors");
const express = require("express");
const app = express();
const config = require("config");
const error = require("./startup/error");



require("./startup/cors")(app);
app.use(express.json());
require("./startup/db")();

const routes = require("./routes/routes");
app.use("/api", routes);
//  app.use(error)

const port = process.env.PORT || config.get("port");
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
    console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
});