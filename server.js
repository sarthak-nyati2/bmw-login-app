const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static("public"));

app.post("/save", (req, res) => {

    const newData = req.body;

    let oldData = [];

    if (fs.existsSync("data.json")) {

        const fileData =
        fs.readFileSync("data.json");

        oldData =
        JSON.parse(fileData);

    }

    oldData.push(newData);

    fs.writeFileSync(
        "data.json",
        JSON.stringify(oldData, null, 2)
    );

    res.json({

        message: "Saved Successfully"

    });

});

app.get("/users", (req, res) => {

    if (fs.existsSync("data.json")) {

        const fileData =
        fs.readFileSync("data.json");

        const users =
        JSON.parse(fileData);

        res.json(users);

    } else {

        res.json([]);

    }

});

app.listen(3000, () => {

    console.log("Server Running On 3000");

});