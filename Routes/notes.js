const router = require("express").Router();
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils.js');
const db = require("../db/db.json");
const { randomUUID } = require("crypto");


router.get("/", (req, res) => {
    readFromFile(".db/db.json").then((data) => res.json(JSON.parse(data)));
});

router.get("/:id", (req, res) => {
    for (let i = 0; i < db.length; i++) {
        if  (db[i] == req.params.id) {
            return res.json(db[i])
        }
    }
    res.status(404).send('Incorrect ID numer')
});

router.post("/", (req, res) => {
    const {title, text} = req.body;
    if (req.body) {
        const newEntry = {
            title,
            text,
            id: randomUUID()
        };

    readAndAppend(newEntry, ".db/db.json");
    res.json("Note entry complete");
    } else {
        res.error("There was a problem with your note entry")
    }
});


module.exports = notes