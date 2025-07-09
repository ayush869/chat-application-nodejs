const express = require("express");
const router = express.Router();
const { generateKey } = require("../helpers/keygen");
const db = require("../db/connection");

router.post("/", async (req, res) => {
    const { username } = req.body;
    const api_key = generateKey();
    const api_uni = generateKey();

    try {
        await db.query(
            "INSERT INTO users (username, api_key, api_uni) VALUES (?, ?, ?)",
            [username, api_key, api_uni]
        );
        res.json({ api_key, api_uni });
    } catch (err) {
        res.status(500).json({ error: "Failed to register user" });
    }
});

module.exports = router;