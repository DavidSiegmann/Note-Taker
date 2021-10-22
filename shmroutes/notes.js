const router = require("express").Router();
const { readFromFile, writeToFile, readAndAppend } = require('../shmelpers/fsUtils');
const db = require("../db/db.json");
const uuid = require("../shmelpers/uuid");



router.get("/", (req, res) => {
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

router.get("/:id", (req, res) => {
    for (let i = 0; i < db.length; i++) {
        if  (db[i] == req.params.id) {
            return res.json(db[i])
        }
    }
    res.status(404).send('Incorrect ID number')
});

router.post("/", (req, res) => {
    const {title, text} = req.body;
    if (req.body) {
        const newEntry = {
            title,
            text,
            id: uuid()
        };

    readAndAppend(newEntry, "./db/db.json");
    res.json("Note entry complete");
    } else {
        res.error("There was a problem with your note entry")
    }
});


module.exports = router