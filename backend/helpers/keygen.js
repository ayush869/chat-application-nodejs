// FILE: chat-app/backend/helpers/keygen.js
const crypto = require("crypto");

exports.generateKey = () => {
    return crypto.randomBytes(16).toString("hex");
};