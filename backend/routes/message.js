const express = require("express");
const router = express.Router();
const db = require("../db/connection");

router.post("/", async (req, res) => {
    const { from_api_uni, to_api_uni, message } = req.body;

    try {
        await db.query(
            "INSERT INTO messages (from_api_uni, to_api_uni, message) VALUES (?, ?, ?)",
            [from_api_uni, to_api_uni, message]
        );
        res.json({ status: "Message Logged" });
    } catch (err) {
        res.status(500).json({ error: "Failed to log message" });
    }
});

module.exports = router;
