const express = require("express");

const path = require("path");

const fs = require("fs");

const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));


// HOME PAGE

app.get("/", (req, res) => {

    res.sendFile(
        path.join(__dirname, "public", "index.html")
    );

});


// SAVE DATA

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


// GET USERS

app.get("/users", (req, res) => {

    if (fs.existsSync("data.json")) {

        const fileData =
        fs.readFileSync("data.json");

        const users =
        JSON.parse(fileData);

        res.json(users);

    }

    else {

        res.json([]);

    }

});


// PORT

const PORT =
process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Server Running on ${PORT}`);

});