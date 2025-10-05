const express = require("express");
const Crossword = require("../models/Crossword.js");

const router = express.Router();

// Fetch all crosswords
router.get("/", async (req, res) => {
    try {
        const data = await Crossword.find();
        res.json(data);
    } catch (err) {
        console.error("Error fetching crosswords:", err);
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const crossword = await Crossword.findById(req.params.id);
        if (!crossword) {
            return res.status(404).json({ message: "Crossword not found" });
        }
        res.json(crossword);
    } catch (err) {
        console.error("Error fetching crossword:", err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
