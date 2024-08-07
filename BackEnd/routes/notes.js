const express = require('express');
const router = express.Router();
const fatchUser = require('../middlaware/fatchUser');
const Notes = require('../models/Notes');
// const { body, validationResult } = require('express-validator')

// Router:1 Fatch All Notes : login require ,, GET /api/notes/fatchallnotes
router.get("/fatchallnotes", fatchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.massage);
        res.status(500).send("Intarnal Serval Error");
    }
})
// Router:2 Add Notes : login require ,, POST /api/notes/addnotes 
router.post("/addnotes", fatchUser,  async (req, res) => {
    try {
        // const error = validationResult(req);
        // if (!error.isEmpty()) {
        //     return res.status(400).json({ error: error.array() });
        // }
        const { title, description, tag } = req.body;

        const note = new Notes(
            { title, description, tag, user: req.user.id }
        );
        const savenote = await note.save();
        res.json(savenote)
    }
    catch (error) {
        console.error(error.massage);
        res.status(500).send("Intarnal Serval Error");
    }

})
// Router:3 Update and update it :login require ,, PUT /api/notes/updatenote/:id
router.put("/updatenote/:id", fatchUser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const updatednotes = {}

        if (title) { updatednotes.title = title };
        if (description) { updatednotes.description = description };
        if (tag) { updatednotes.tag = tag };

        let note = await Notes.findById(req.params.id);

        if (!note) {
            return res.status(404).send("Not Found")
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: updatednotes }, { new: true })
        res.json({ note })
    } catch (error) {
        console.error(error.massage);
        res.status(500).send("Intarnal Serval Error");
    }

})
// Router:4 Delete and Delete it : login require ,, DELETE /api/notes/notedelete/
router.delete("/notedelete/:id", fatchUser, async (req, res) => {

    try {
        let note = await Notes.findById(req.params.id);

        if (!note) {
            return res.status(404).send("Not Found")
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Delete": "Sucessfully Deleted ..." })
    } catch (error) {
        console.error(error.massage);
        res.status(500).send("Intarnal Serval Error");
    }

})


module.exports = router;