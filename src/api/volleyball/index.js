const http = require("http");
require("dotenv").config();

const app = require("./src/app");
const connection = require("./src/db/connection");
const server = http.createServer(app);

async function startServer() {
    await connection();

    server.listen(3000, ()=>{
        console.log("server live at http://localhost:3000 ");
    });
}

startServer();