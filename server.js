const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const notes = require("./routes/notes")
app.use("/api/notes", notes)

app.get("/", (req, res) => 
    res.sendFile(path.join(__dirname, "public/index.html"))
);

app.get("/notes", (req, res) => 
    res.sendFile(path.join(__dirname, "public/notes.html"))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
