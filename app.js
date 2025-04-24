const fs = require("fs");
const https = require("https");
const express = require("express");
const path = require("path");

const app = express();
const server = https.createServer({
  key: fs.readFileSync("./cert/key.pem"),
  cert: fs.readFileSync("./cert/cert.pem")
}, app);

const PORT = 443;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => res.redirect("/reception"));
app.get("/reception", (req, res) => res.render("reception"));
app.get("/room", (req, res) => res.render("room"));

server.listen(PORT, () => {
  console.log(`Servidor rodando em https://localhost:${PORT}`);
});
