const express = require("express");
const path = require("path");
const PORT = 3001;
const app = express();
const notes = require(".Routes/notes")

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use("/api/notes", notes)


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/index.html"))
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/notes.html"))
});

