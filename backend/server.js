const express = require("express");
const cors = require("cors");
const app = express();
const register = require("./routes/register");
const message = require("./routes/message");
require("./core/customSocketServer");

app.use(cors());
app.use(express.json());

app.use("/register", register);
app.use("/message", message);

app.listen(5000, '192.168.1.8', () => console.log("API running at http://192.168.1.8:5000"));