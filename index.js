require('dotenv').config();
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const JSON_PATH = path.join(__dirname,"data","paintings.json");
const PORT = process.env.PORT;
const HOST = process.env.HOST;

let paintings = [];

function readData(path) {
  let data = null;
  
  fs.readFile(path, (err, data) => {
    if (err) {
      console.warn(`Failed to read JSON file ${jsonPath}`);
      console.warn(err);
    } else {
      data = JSON.parse(data);
    }
  });

  return data;
}

paintings = readData(JSON_PATH);

app.get("/", (req, res) => {
  res.json(paintings);
});

//app.get("/title/:id/:sub", (req, res) => {req.params.sub, req.params.id});


app.listen(PORT, 'localhost', `Listening on ${PORT}`);
console.log(`Listening on ${HOST}:${PORT}`);
